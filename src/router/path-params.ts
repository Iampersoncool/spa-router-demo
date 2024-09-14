import { TPathParams } from './types';

export default class PathParams {
  constructor(private params: TPathParams) {}

  public get<T>(key: string): T {
    return this.params[key] as T;
  }

  public getAll(): TPathParams {
    return this.params;
  }
}
