'use strict';

const Schema = use('Schema');

class LineItemSchema extends Schema {

  up() {
    this.create('line_items', (table) => {
      table.increments();
      table.integer('order_id').references('orders.id');
      table.integer('drink_id').references('drinks.id');
      table.integer('quantity');
      table.float('price');
      table.timestamps();
    });
  }

  down() {
    this.drop('line_items');
  }

}

module.exports = LineItemSchema;
