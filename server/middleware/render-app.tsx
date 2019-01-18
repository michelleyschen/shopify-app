import * as React from 'react';
import {Context} from 'koa';
import {getDataFromTree} from 'react-apollo';

import {extract} from '@shopify/react-effect/server';
import {Html, Manager as HtmlManager, render} from '@shopify/react-html/server';
import {ServerManager, applyToContext} from '@shopify/react-network/server';

import {Assets} from '@shopify/sewing-kit-koa';
import App, {createGraphQLClient} from '../../app';

export default async function renderApp(ctx: Context) {
  const {assets} = ctx.state as {assets: Assets};

  const locale = 'en';
  const networkManager = new ServerManager();
  const htmlManager = new HtmlManager();

  // We would like to push this one into the App, but for now
  // it can’t because we don’t serialize until `extract`, at which
  // point we have a different client than the one that was "filled"
  // in getDataFromTree(). Moving `getDataFromTree()` would probably
  // solve this...
  const graphQLClient = createGraphQLClient({
    server: true,
  });

  const app = (
    <App
      server
      locale={locale}
      location={ctx.request.url}
      htmlManager={htmlManager}
      networkManager={networkManager}
      graphQLClient={graphQLClient}
    />
  );

  await getDataFromTree(app);
  await extract(app);

  applyToContext(ctx, networkManager);

  ctx.body = render(
    <Html
      locale={locale}
      manager={htmlManager}
      styles={await assets.styles()}
      scripts={await assets.scripts()}
      title="your-app-name"
    >
      {app}
    </Html>,
  );
}
