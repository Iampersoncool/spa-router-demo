import PathParams from './path-params';
import Router from './router';
import { TPathParams } from './types';

export default class Context {
  private searchParams: URLSearchParams;
  private pathParams: PathParams;

  constructor(
    private router: Router,
    search: string | undefined,
    pathParamsInput: TPathParams,
    private store: Map<any, any> = new Map()
  ) {
    this.searchParams = new URLSearchParams(search);
    this.pathParams = new PathParams(pathParamsInput);
  }

  public redirect(path: string, fullPageRefresh: boolean = false) {
    if (fullPageRefresh) {
      location.href = path;
      return;
    }

    history.pushState(null, '', path);
    this.router.handle(location.href);
  }

  public set(key: string, value: any) {
    this.store.set(key, value);
  }

  public get<T>(key: string): T {
    return this.store.get(key) as T;
  }

  public path(): PathParams {
    return this.pathParams;
  }

  public query() {
    return this.searchParams;
  }
}
