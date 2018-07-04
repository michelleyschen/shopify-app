/* eslint-disable no-process-env */

const apiKey = process.env.SHOPIFY_API_KEY || 'shopify_app_api_key';
const secret = process.env.SHOPIFY_SECRET || 'shopify_app_secret';
const scopes = ['write_products'];

module.exports = {
  apiKey,
  secret,
  scopes,
};
