'use strict';

const Schema = use('Schema');

class LineItemSchema extends Schema {

  up() {
    this.create('line_items', (table) => {
      table.increments();
      table.drink('belongsTo');
      table.order('belongsTo');
      table.float('price');
      table.integer('quantity');
      table.timestamps();
    });
  }

  down() {
    this.drop('line_items');
  }

}

module.exports = LineItemSchema;
