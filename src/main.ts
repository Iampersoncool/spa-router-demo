import { Router } from './router';

// @ts-ignore: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  await import('urlpattern-polyfill');
}

const barRouter = new Router();
barRouter.use((_ctx, next) => {
  console.log('barRouter global mw');
  next();
});
barRouter.get('/:id', (ctx) => {
  console.log(ctx.path());
});

const fooRouter = new Router();
fooRouter.route('/bar', barRouter);

const router = new Router();
router.use((_ctx, next) => {
  console.log(location.href);

  console.log('router global mw');
  next();
});
router.route('/foo', fooRouter);

router.get('/', function (ctx) {
  const name = ctx.query().get('name');
  if (!name) {
    return ctx.redirect('/foo/bar/10');
  }

  console.log(name);
});

router.start();
