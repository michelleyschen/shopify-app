import {GraphQLRequest, ApolloLink, Operation, Observable} from 'apollo-link';
import {
  ApolloReducerConfig,
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

import MockApolloLink from './link';
import {GraphQLMock} from './types';

export interface Options {
  unionOrIntersectionTypes?: any[];
  cacheOptions?: ApolloReducerConfig;
}

export interface GraphQLClientOptions {
  ssrMode?: boolean;
}

function defaultGraphQLMock({operationName}: GraphQLRequest) {
  return new Error(
    `Can’t perform GraphQL operation '${operationName ||
      ''}' because no mocks were set.`,
  );
}

interface Request {
  operation: Operation;
  resolve(): Promise<void>;
}

class GraphQL {
  client: ApolloClient<unknown>;

  private requests = new Set<Request>();
  private incompleteRequests = new Set<Request>();
  private afterResolver: (() => void) | undefined;

  constructor(
    mock: GraphQLMock,
    {unionOrIntersectionTypes = [], cacheOptions = {}}: Options = {},
  ) {
    const cache = new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: {
          __schema: {
            types: unionOrIntersectionTypes,
          },
        },
      }),
      ...cacheOptions,
    });

    const mockLink = new MockApolloLink(mock);

    const memoryLink = new ApolloLink((operation, forward) => {
      if (forward == null) {
        return null;
      }

      let resolver: Function;

      const promise = new Promise<void>((resolve) => {
        resolver = resolve;
      });

      const request = {
        operation,
        resolve: () => {
          resolver();
          this.incompleteRequests.delete(request);

          return promise;
        },
      };

      this.requests.add(request);
      this.incompleteRequests.add(request);

      return new Observable((observer) => {
        return forward(operation).subscribe({
          complete() {
            const complete = observer.complete.bind(observer);
            promise.then(complete).catch(complete);
          },
          next(result) {
            const next = observer.next.bind(observer, result);
            promise.then(next).catch(next);
          },
          error(error) {
            const fail = observer.error.bind(observer, error);
            promise.then(fail).catch(fail);
          },
        });
      });
    });

    const client = new ApolloClient({
      link: memoryLink.concat(mockLink),
      cache,
    });

    this.client = client;
  }

  afterResolve(resolver: () => void) {
    this.afterResolver = resolver;
  }

  async resolveAll() {
    await Promise.all(
      Array.from(this.incompleteRequests).map(({resolve}) => resolve()),
    );

    if (this.afterResolver) {
      this.afterResolver();
    }
  }
}

export default function createGraphQLFactory(options?: Options) {
  return function createGraphQLClient(mock: GraphQLMock = defaultGraphQLMock) {
    return new GraphQL(mock, options);
  };
}
