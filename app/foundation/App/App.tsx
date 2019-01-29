import * as React from 'react';
import {hot} from 'react-hot-loader';

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
  AppDetails,
} from './components';

interface Props {
  locale?: string;
  server?: boolean;
  location?: string;
  networkManager?: NetworkManager;
  htmlManager?: HtmlManager;
  apiKey?: string;
  shop?: string;
}

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component<Props> {
  render() {
    const {
      location,
      networkManager,
      htmlManager = new HtmlManager(),
      locale = 'en',
      apiKey,
      shop,
    } = this.props;

    return (
      <NetworkProvider manager={networkManager}>
        <HtmlProvider manager={htmlManager}>
          <ContentSecurityPolicy />
          <Metadata />
          <I18n locale={locale}>
            <AppDetails linkComponent={Link} apiKey={apiKey} shop={shop}>
              <Router location={location}>
                <Routes />
              </Router>
            </AppDetails>
          </I18n>
        </HtmlProvider>
      </NetworkProvider>
    );
  }
}

export default hot(module)(App);
