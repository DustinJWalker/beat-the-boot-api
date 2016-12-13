const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Shop extends JsonApiView {
  get attributes() {
    return [
      'name',
      'description',
      'picture',
      'street',
      'city',
      'state',
      'zip',
      'parking',
      'phone',
      'profile_pic_url',
    ];
  }

  drinks() {
    return this.hasMany('App/Http/JsonApiViews/Drink', {
      included: true,
      excludeRelation: 'shop',
    });
  }
  orders() {
    return this.hasMany('App/Http/JsonApiViews/Order', {
      included: false,
      excludeRelation: 'shop',
    });
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'shops',
    });
  }

}

module.exports = Shop;
