'use strict';

const Shop = use('App/Model/Shop');
const attributes = ['name', 'description', 'picture', 'street', 'city', 'state', 'zip', 'parking', 'phone'];

class ShopController {

  * index(request, response) {
    const shops = yield Shop.with('drink', 'user').fetch();

    response.jsonApi('Shop', shops);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.currentUser.id,
    };
    const shop = yield Shop.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Shop', shop);
  }

  * show(request, response) {
    const id = request.param('id');
    const shop = yield Shop.with('drink', 'user').where({ id }).firstOrFail();

    response.jsonApi('Shop', shop);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const shop = yield Shop.with('drink', 'user').where({ id }).firstOrFail();
    shop.fill(Object.assign({}, input, foreignKeys));
    yield shop.save();

    response.jsonApi('Shop', shop);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const shop = yield Shop.query().where({ id }).firstOrFail();
    yield shop.delete();

    response.status(204).send();
  }

}

module.exports = ShopController;
