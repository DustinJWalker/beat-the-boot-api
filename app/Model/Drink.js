'use strict'

const Lucid = use('Lucid')

class Drink extends Lucid {


  shop() {
    return this.belongsTo('App/Model/Shop', 'id', 'shop_id');
  }
}

module.exports = Drink
