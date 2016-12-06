const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Drink extends JsonApiView {
  get attributes() {
    return ['description', 'price', 'name'];
  }

  shop() {
    return this.belongsTo('App/Http/JsonApiViews/Shop', {
      included: true,
      excludeRelation: 'drinks'
    });
  }

}

module.exports = Drink;
