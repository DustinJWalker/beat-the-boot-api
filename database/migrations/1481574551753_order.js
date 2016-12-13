'use strict';

const Schema = use('Schema');

class OrderSchema extends Schema {

  up() {
    this.create('orders', (table) => {
      table.increments();
      table.integer('shop_id').references('shops.id');
      table.integer('user_id').references('users.id');
      
      table.timestamps();
    });
  }

  down() {
    this.drop('orders');
  }

}

module.exports = OrderSchema;
