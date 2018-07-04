require('./env-setup');

/* eslint-disable no-process-env */

// localhost:8081 is the sewing-kit default for dev server
const ip = process.env.IP || 'localhost';
const port = Number(process.env.PORT) || 8081;

// localhost:8080 is the sewing-kit default build server
const assetPrefix =
  process.env.CDN_URL || 'http://localhost:8080/webpack/assets/';

module.exports = {
  ip,
  port,
  assetPrefix,
};
