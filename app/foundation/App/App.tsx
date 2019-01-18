import * as React from 'react';
import {hot} from 'react-hot-loader';
import ApolloClient from 'apollo-client';

import {AppProvider} from '@shopify/polaris';
import {
  Manager as HtmlManager,
  Provider as HtmlProvider,
} from '@shopify/react-html';
import {
  Manager as NetworkManager,
  Provider as NetworkProvider,
} from '@shopify/react-network';

import Link from '../Link';
import Routes from '../Routes';

import {
  ContentSecurityPolicy,
  Router,
  Metadata,
  I18n,
  GraphQL,
} from './components';

interface Props {
  locale?: string;
  server?: boolean;
  location?: string;
  networkManager?: NetworkManager;
  htmlManager?: HtmlManager;
  graphQLClient?: ApolloClient<unknown>;
}

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component<Props> {
  render() {
    const {
      location,
      networkManager,
      htmlManager = new HtmlManager(),
      locale = 'en',
      graphQLClient,
    } = this.props;

    return (
      <NetworkProvider manager={networkManager}>
        <HtmlProvider manager={htmlManager}>
          <ContentSecurityPolicy />
          <Metadata />
          <GraphQL client={graphQLClient}>
            <I18n locale={locale}>
              <AppProvider linkComponent={Link}>
                <Router location={location}>
                  <Routes />
                </Router>
              </AppProvider>
            </I18n>
          </GraphQL>
        </HtmlProvider>
      </NetworkProvider>
    );
  }
}

export default hot(module)(App);
