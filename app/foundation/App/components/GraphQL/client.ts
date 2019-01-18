import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';

export interface Options {
  server?: boolean;
  initialData?: NormalizedCacheObject;
}

export default function createGraphQLClient({server, initialData}: Options) {
  const cache = new InMemoryCache({
    dataIdFromObject: (object) => object.id,
  });

  const link = createHttpLink();

  return new ApolloClient({
    link,
    ssrMode: server,
    ssrForceFetchDelay: 100,
    cache: initialData ? cache.restore(initialData) : cache,
    connectToDevTools: !server && process.env.NODE_ENV === 'development',
  });
}
