require('./env-setup');

/* eslint-disable no-process-env */
const apiKey = process.env.SHOPIFY_API_KEY || '';
const hostName = process.env.HOST_NAME || '';
const secret = process.env.SHOPIFY_SECRET || '';
const password = process.env.SHOPIFY_PASSWORD || '';
const scopes = [];

module.exports = {
  apiKey,
  hostName,
  secret,
  password,
  scopes,
};
