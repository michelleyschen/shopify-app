require('./env-setup');

/* eslint-disable no-process-env */
const apiKey = process.env.SHOPIFY_API_KEY || 'shopify_app_api_key';
const hostName = process.env.HOST_NAME || '';
const secret = process.env.SHOPIFY_SECRET || 'shopify_app_secret';
const password = process.env.SHOPIFY_PASSWORD || 'shopify_private_app_password';
const scopes = [];

module.exports = {
  apiKey,
  hostName,
  secret,
  password,
  scopes,
};
