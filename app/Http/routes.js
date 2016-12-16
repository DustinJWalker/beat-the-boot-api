'use strict';

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');

Route.post('/api/users', 'UserController.store');

Route.resource('/api/users', 'UserController')
  .only(['index', 'show', 'update', 'destroy'])
  .middleware('auth');

Route.resource('/api/shops', 'ShopController')
  .except(['create', 'edit'])
  .middleware('auth');

Route.resource('/api/drinks', 'DrinkController')
  .except(['create', 'edit'])
  .middleware('auth');

Route.resource('/api/orders', 'OrderController')
  .except(['create', 'edit'])
  .middleware('auth');

Route.resource('/api/line-items', 'LineItemController')
  .except(['create', 'edit'])
  .middleware('auth');

Route.post('/api/token-auth', 'SessionController.store');

const File = use('File');

Route.get('/uploads/:id', function* (request, response) {
  // return response.send(request.param('id'));


  const stream = File.getStream(request.param('id'));

  stream.pipe(response.response);
});
