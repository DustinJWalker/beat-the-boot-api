const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Order extends JsonApiView {
  get attributes() {
    return ['belongsTo', 'belongsTo'];
  }

  lineItems() {
    return this.hasMany('App/Http/JsonApiViews/LineItem', {
      included: true,
      excludeRelation: 'order'
    });
  }

}

module.exports = Order;
