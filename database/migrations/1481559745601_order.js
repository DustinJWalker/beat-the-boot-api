'use strict';

const Schema = use('Schema');

class OrderSchema extends Schema {

  up() {
    this.create('orders', (table) => {
      table.increments();
      table.user('belongsTo');
      table.shop('belongsTo');
      
      table.timestamps();
    });
  }

  down() {
    this.drop('orders');
  }

}

module.exports = OrderSchema;
