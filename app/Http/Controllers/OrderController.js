'use strict';

const Order = use('App/Model/Order');
const attributes = [];

class OrderController {

  * index(request, response) {
    const orders = yield Order.with('shop', 'user', 'lineItems.drink').fetch();

    response.jsonApi('Order', orders);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      shop_id: request.jsonApi.getRelationId('shop'),
      user_id: request.currentUser.id,
    };
    const order = yield Order.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Order', order);
  }

  * show(request, response) {
    const id = request.param('id');
    const order = yield Order.with('shop', 'user', 'lineItems.drink').where({ id }).firstOrFail();

    response.jsonApi('Order', order);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      shop_id: request.jsonApi.getRelationId('shop'),
      user_id: request.currentUser.id,
    };

    const order = yield Order.with('shop', 'user', 'lineItems.drink').where({ id }).firstOrFail();
    order.fill(Object.assign({}, input, foreignKeys));
    yield order.save();

    response.jsonApi('Order', order);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const order = yield Order.query().where({ id }).firstOrFail();
    yield order.delete();

    response.status(204).send();
  }

}

module.exports = OrderController;
