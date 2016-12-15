const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return ['email', 'name', 'is_shop_owner'];
  }

  shop() {
    return this.belongsTo('App/Http/JsonApiViews/Shop', {
      included: true,
      excludeRelation: 'user',
    });
  }

}

module.exports = User;
