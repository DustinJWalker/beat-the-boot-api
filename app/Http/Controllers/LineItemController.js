'use strict';

const LineItem = use('App/Model/LineItem');
const attributes = ['quantity', 'price'];

class LineItemController {

  * index(request, response) {
    const lineItems = yield LineItem.with('order').fetch();

    response.jsonApi('LineItem', lineItems);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      order_id: request.jsonApi.getRelationId('order'),
      drink_id: request.jsonApi.getRelationId('drink'),
    };
    const lineItem = yield LineItem.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('LineItem', lineItem);
  }

  * show(request, response) {
    const id = request.param('id');
    const lineItem = yield LineItem.with('order').where({ id }).firstOrFail();

    response.jsonApi('LineItem', lineItem);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      order_id: request.jsonApi.getRelationId('order'),
      drink_id: request.jsonApi.getRelationId('drink'),
    };

    const lineItem = yield LineItem.with('order').where({ id }).firstOrFail();
    lineItem.fill(Object.assign({}, input, foreignKeys));
    yield lineItem.save();

    response.jsonApi('LineItem', lineItem);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const lineItem = yield LineItem.query().where({ id }).firstOrFail();
    yield lineItem.delete();

    response.status(204).send();
  }

}

module.exports = LineItemController;
