const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class LineItem extends JsonApiView {
  get attributes() {
    return ['quantity', 'price'];
  }

  order() {
    return this.belongsTo('App/Http/JsonApiViews/Order', {
      included: true,
      excludeRelation: 'lineItems',
    });
  }

  drink() {
    return this.belongsTo('App/Http/JsonApiViews/Drink', {
      included: true,
      excludeRelation: 'lineItems',
    });
  }

}

module.exports = LineItem;
