import Route from './route';
import { MiddlewareFn } from './types';

import { createMiddlewareHandler } from './helpers';
import Context from './context';

export default class Router {
  constructor(
    private routes: Route[] = [],
    private middleware: MiddlewareFn[] = []
  ) {}

  /**
   *
   * @description internal
   */

  public handle(path: string) {
    for (const route of this.routes) {
      const match = route.getPattern().exec(path);
      if (!match) continue;

      const ctx = new Context(
        this,
        match.search.groups[0],
        match.pathname.groups
      );

      const middlewareFns = this.middleware.concat(route.getMiddleware());
      const next = createMiddlewareHandler(ctx, middlewareFns);
      next();

      break;
    }
  }

  public getMiddleware() {
    return this.middleware;
  }

  public getRoutes() {
    return this.routes;
  }

  public use(...middleware: MiddlewareFn[]) {
    this.middleware = this.middleware.concat(middleware);
  }

  public route(path: string, router: Router) {
    this.middleware = this.middleware.concat(router.getMiddleware());

    for (const route of router.getRoutes()) {
      const newPath = path + route.getPath();
      this.get(newPath, ...route.getMiddleware());
    }
  }

  public get(path: string, ...middleware: MiddlewareFn[]) {
    this.routes.push(new Route(path, middleware));
  }

  /**
   * @description calls router.handle()
   */

  public start() {
    console.time('router boot');
    this.handle(location.href);
    console.timeEnd('router boot');
  }
}
