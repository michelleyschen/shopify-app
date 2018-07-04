const dotenv = require('dotenv');

dotenv.config();

const path = require('path');

const tests = path.join(__dirname, 'tests');

const {ip, port} = require('./config/server');

module.exports = function sewingKitConfig(plugins, env) {
  const entryPoints = {
    main: path.join(__dirname, env.target),
  };

  return {
    name: 'my-app-name',
    plugins: [
      plugins.devServer({
        ip,
        port,
      }),
      plugins.entry(entryPoints),
      plugins.vendors([
        'react',
        'react-dom',
        'react-router',
        'react-router-dom',
        '@shopify/polaris',
      ]),
      plugins.jest(config => {
        config.setupFiles.push(path.join(tests, 'setup.ts'));

        config.collectCoverage = true;
        config.collectCoverageFrom = [
          'app/**/*.{ts,tsx}',
          'client/**/*.{ts,tsx}',
          'server/**/*.{ts,tsx}',
          '!**/index.{ts,tsx}',
          '!**/*.d.ts',
        ];
        config.coverageDirectory = 'coverage';

        return config;
      }),
    ],
  };
};
