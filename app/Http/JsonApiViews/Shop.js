const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Shop extends JsonApiView {
  get attributes() {
    return ['name', 'description', 'picture', 'street', 'city', 'state', 'zip', 'parking', 'phone'];
  }

  drink() {
    return this.hasMany('App/Http/JsonApiViews/Drink', {
      included: true,
      excludeRelation: 'shop'
    });
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'shops'
    });
  }

}

module.exports = Shop;
