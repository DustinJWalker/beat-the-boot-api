'use strict';

const Lucid = use('Lucid');

class Shop extends Lucid {


  drinks() {
    return this.hasMany('App/Model/Drink', 'id', 'shop_id');
  }
  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Shop;
