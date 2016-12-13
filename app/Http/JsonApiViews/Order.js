const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Order extends JsonApiView {
  get attributes() {
    return ['created_at'];
  }

  shop() {
    return this.belongsTo('App/Http/JsonApiViews/Shop', {
      included: true,
      excludeRelation: 'orders',
    });
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'orders',
    });
  }

  lineItems() {
    return this.hasMany('App/Http/JsonApiViews/LineItem', {
      included: true,
      excludeRelation: 'order',
    });
  }

}

module.exports = Order;
