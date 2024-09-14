import { MiddlewareFn } from './types';

export default class Route {
  private pattern: URLPattern;
  private middleware: MiddlewareFn[];
  private path: string;

  constructor(path: string, middleware: MiddlewareFn[]) {
    this.path = path;
    this.middleware = middleware;
    this.pattern = new URLPattern({ pathname: path, baseURL: location.href });
  }

  public getPath() {
    return this.path;
  }

  public getMiddleware() {
    return this.middleware;
  }

  public getPattern() {
    return this.pattern;
  }

  public setPattern(pattern: URLPattern) {
    this.pattern = pattern;
  }
}
