import Context from './context';

export type MiddlewareFn = (ctx: Context, next: Function) => void;

export type TPathParams = { [key: string]: string | undefined };
