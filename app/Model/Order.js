'use strict'

const Lucid = use('Lucid')

class Order extends Lucid {


  shop() {
    return this.belongsTo('App/Model/Shop', 'id', 'shop_id');
  }
  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
  lineItems() {
    return this.hasMany('App/Model/LineItem', 'id', 'order_id');
  }
}

module.exports = Order
