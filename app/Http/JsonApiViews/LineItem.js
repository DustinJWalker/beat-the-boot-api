const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class LineItem extends JsonApiView {
  get attributes() {
    return ['belongsTo', 'belongsTo', 'price', 'quantity'];
  }

}

module.exports = LineItem;
