import Context from './context';
import { MiddlewareFn } from './types';

export function createMiddlewareHandler(
  ctx: Context,
  middleware: MiddlewareFn[]
) {
  let mwIdx = 0;
  const next = () => {
    if (mwIdx === middleware.length) return;

    middleware[mwIdx++](ctx, next);
  };

  return next;
}
