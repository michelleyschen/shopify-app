import {join} from 'path';
import {Env, Plugins} from '@shopify/sewing-kit';
import {assetPrefix, ip, port} from './config/server';

const tests = join(__dirname, 'tests');

module.exports = function sewingKitConfig(plugins: Plugins, env: Env) {
  return {
    name: 'your-app-name',
    plugins: [
      plugins.devServer({
        ip,
        port,
      }),
      plugins.cdn(assetPrefix),
      plugins.vendors([
        '@shopify/javascript-utilities',
        '@shopify/network',
        '@shopify/polaris',
        '@shopify/react-compose',
        '@shopify/react-effect',
        '@shopify/react-html',
        '@shopify/react-i18n',
        '@shopify/react-network',
        '@shopify/react-utilities',
        'react',
        'react-dom',
        'react-router',
        'react-router-dom',
        'prop-types',
        'react-apollo',
        'apollo-cache-inmemory',
        'apollo-client',
        'apollo-link-http',
      ]),
      plugins.jest((config) => {
        config.setupFiles.push(join(tests, 'setup.ts'));
        config.setupTestFrameworkScriptFile = join(tests, 'each-test.ts');
        config.globals = config.globals || {};
        config.globals['ts-jest'] = config.globals['ts-jest'] || {};
        config.globals['ts-jest'].diagnostics = false;
        config.globals['ts-jest'].isolatedModules = true;
        return config;
      }),
    ],
  };
};
