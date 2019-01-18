import {resolve} from 'path';
import {readFileSync} from 'fs';
import * as React from 'react';
import {ErrorBoundary, createAppContextMount} from '@shopify/react-testing';
import {
  Provider as I18nProvider,
  Manager as I18nManager,
} from '@shopify/react-i18n';
import {AppProvider} from '@shopify/polaris';

import {buildSchema} from 'graphql';
import {createFiller} from 'graphql-fixtures';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import createGraphQLFactory from '@shopify/react-apollo/testing';

export * from '@shopify/enzyme-utilities';

const schema = buildSchema(
  readFileSync(
    resolve(__dirname, `../../build/graphql/schemas/default.graphql`),
    'utf8',
  ),
);

export const fillGraphQL = createFiller(schema, {addTypename: true});
export const createGraphQL = createGraphQLFactory();

export interface I18nManagerContext {
  i18nManager: I18nManager;
}

interface Options {
  locale?: string;
  currency?: string;
  resolveInitialGraphQL?: boolean;
  graphQL?: ReturnType<typeof createGraphQL>;
}
type Context = {
  graphQL: ReturnType<typeof createGraphQL>;
} & I18nManagerContext;

export const mountWithAppContext = createAppContextMount<
  true,
  Options,
  Context
>({
  context(options: Options) {
    const {
      locale = 'en',
      currency = 'usd',
      graphQL = createGraphQL(),
    } = options;

    const i18nManager = new I18nManager({
      fallbackLocale: 'en',
      locale,
      currency,
    });
    return {i18nManager, graphQL};
  },
  render(element: React.ReactNode, {i18nManager, graphQL}) {
    return (
      <AppContext i18nManager={i18nManager} graphQLClient={graphQL.client}>
        {element}
      </AppContext>
    );
  },
  async afterMount(wrapper, {graphQL}, {resolveInitialGraphQL = true}) {
    graphQL.afterResolve(() => wrapper.update());

    if (resolveInitialGraphQL) {
      await graphQL.resolveAll();
    }

    return wrapper;
  },
});

interface Props {
  children: React.ReactNode;
  i18nManager: I18nManager;
  graphQLClient: ApolloClient<unknown>;
}

function AppContext({children, i18nManager, graphQLClient}: Props) {
  return (
    <AppProvider>
      <I18nProvider manager={i18nManager}>
        <ApolloProvider client={graphQLClient}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </ApolloProvider>
      </I18nProvider>
    </AppProvider>
  );
}
