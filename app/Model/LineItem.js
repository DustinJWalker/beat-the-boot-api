'use strict';

const Lucid = use('Lucid');

class LineItem extends Lucid {


  order() {
    return this.belongsTo('App/Model/Order', 'id', 'order_id');
  }

  drink() {
    return this.belongsTo('App/Model/Drink', 'id', 'drink_id');
  }
}

module.exports = LineItem;
