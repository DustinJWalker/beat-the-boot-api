'use strict'

const Lucid = use('Lucid')

class Order extends Lucid {


  lineItems() {
    return this.hasMany('App/Model/LineItem', 'id', 'order_id');
  }
}

module.exports = Order
