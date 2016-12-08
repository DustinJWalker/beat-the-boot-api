'use strict';

const Drink = use('App/Model/Drink');
const attributes = ['description', 'price', 'name'];

class DrinkController {

  * index(request, response) {
    const drinks = yield Drink.with('shop').fetch();

    response.jsonApi('Drink', drinks);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const shop = yield request.authUser.shop().fetch();

    const foreignKeys = {
      shop_id: shop.id,
    };
    const drink = yield Drink.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Drink', drink);
  }

  * show(request, response) {
    const id = request.param('id');
    const drink = yield Drink.with('shop').where({ id }).firstOrFail();

    response.jsonApi('Drink', drink);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const shop = yield request.authUser.shop().fetch();

    const foreignKeys = {
      shop_id: shop.id,
    };

    const drink = yield Drink.with('shop').where({ id }).firstOrFail();
    drink.fill(Object.assign({}, input, foreignKeys));
    yield drink.save();

    response.jsonApi('Drink', drink);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const drink = yield Drink.query().where({ id }).firstOrFail();
    yield drink.delete();

    response.status(204).send();
  }

}

module.exports = DrinkController;
