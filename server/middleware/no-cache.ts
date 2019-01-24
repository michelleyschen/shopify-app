import {Context} from 'koa';
import {Header, noCache as noCacheValue} from '@shopify/network';

export default async function noCache(ctx: Context, next: () => Promise<any>) {
  ctx.set(Header.CacheControl, noCacheValue);
  await next();
}
