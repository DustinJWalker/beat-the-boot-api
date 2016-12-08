const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return ['email', 'name'];
  }

  shop() {
    return this.belongsTo('App/Http/JsonApiViews/Shop', {
      included: true,
      excludeRelation: 'user',
    });
  }

}

module.exports = User;
