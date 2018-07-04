import React from 'react';
import {Context} from 'koa';
import {resolve} from 'path';
import {readJSONSync} from 'fs-extra';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import HTML, {DOCTYPE} from '@shopify/react-html';

import App from '../app';

const assetsPath = resolve(__dirname, '../build/client/assets.json');

export default function renderApp(ctx: Context) {
  const {js, css} = readJSONSync(assetsPath).entrypoints.main;
  const context = {};

  try {
    ctx.status = 200;
    ctx.body =
      DOCTYPE +
      renderToString(
        // eslint-disable-next-line react/jsx-pascal-case
        <HTML scripts={js} styles={css}>
          <StaticRouter location={ctx.request.url} context={context}>
            <App />
          </StaticRouter>
        </HTML>,
      );
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}
