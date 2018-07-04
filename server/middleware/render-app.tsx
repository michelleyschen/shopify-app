import * as React from 'react';
import {Context} from 'koa';
import {extract} from '@shopify/react-effect/server';
import {Html, Manager as HtmlManager, render} from '@shopify/react-html/server';
import {ServerManager, applyToContext} from '@shopify/react-network/server';

import {Assets} from '@shopify/sewing-kit-koa';

import App from '../../app';

export default async function renderApp(ctx: Context) {
  const {assets} = ctx.state as {assets: Assets};

  const locale = 'en';
  const networkManager = new ServerManager();
  const htmlManager = new HtmlManager();

  const app = (
    <App
      server
      locale={locale}
      location={ctx.request.url}
      htmlManager={htmlManager}
      networkManager={networkManager}
    />
  );

  await extract(app);

  applyToContext(ctx, networkManager);

  ctx.body = render(
    <Html
      locale={locale}
      manager={htmlManager}
      styles={await assets.styles()}
      scripts={await assets.scripts()}
    >
      {app}
    </Html>,
  );
}
