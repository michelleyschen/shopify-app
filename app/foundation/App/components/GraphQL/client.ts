import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import {Header} from '@shopify/react-network';

export interface Options {
  server?: boolean;
  initialData?: NormalizedCacheObject;
  shop?: string;
  accessToken?: string;
}

export default function createGraphQLClient({
  server,
  initialData,
  shop,
  accessToken,
}: Options) {
  const cache = new InMemoryCache({
    dataIdFromObject: (object) => object.id,
  });

  const headers = {
    [Header.Accept.toLowerCase()]: 'application/json',
    [Header.ContentType.toLowerCase()]: 'application/json',
  };

  if (accessToken) {
    headers['X-Shopify-Access-Token'] = accessToken;
  }

  const uri =
    shop && accessToken ? `https://${shop}/admin/api/graphql` : '/graphql';

  const link = createHttpLink({
    credentials: 'include',
    uri,
    headers,
  });

  return new ApolloClient({
    link,
    ssrMode: server,
    ssrForceFetchDelay: 100,
    cache: initialData ? cache.restore(initialData) : cache,
    connectToDevTools: !server && process.env.NODE_ENV === 'development',
  });
}
