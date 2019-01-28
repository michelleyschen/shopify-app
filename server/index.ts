import './setup';

import Koa from 'koa';
import session from 'koa-session';

import {middleware as sewingKitMiddleware} from '@shopify/sewing-kit-koa';
import shopifyAuth, {verifyRequest} from '@shopify/koa-shopify-auth';

import {ip, port, assetPrefix} from '../config/server';
import {apiKey, secret, scopes} from '../config/app';

import {renderApp, noCache} from './middleware';

const app = new Koa();
app.keys = [secret];

app.use(session(app));

app.use(
  shopifyAuth({
    apiKey,
    secret,
    scopes,
    afterAuth(ctx: Koa.Context) {
      ctx.redirect('/');
    },
  }),
);

app.use(verifyRequest());

app.use(sewingKitMiddleware({assetPrefix}));

app.use(noCache);

app.use(renderApp);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[init] listening on ${ip}:${port}`);
});

export default app;
