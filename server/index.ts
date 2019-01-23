import './setup';

import Koa from 'koa';
import session from 'koa-session';

import {middleware as sewingKitMiddleware} from '@shopify/sewing-kit-koa';
import graphQLProxy from '@shopify/koa-shopify-graphql-proxy';

import {ip, port, assetPrefix} from '../config/server';
import {password, hostName} from '../config/app';

import {renderApp, noCache} from './middleware';

const app = new Koa();
app.keys = [password];

app.use(session(app));

app.use(graphQLProxy({shop: hostName, password}));

app.use(sewingKitMiddleware({assetPrefix}));

app.use(noCache);

app.use(renderApp);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[init] listening on ${ip}:${port}`);
});

export default app;
