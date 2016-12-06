'use strict';

const Schema = use('Schema');

class DrinkSchema extends Schema {

  up() {
    this.create('drinks', (table) => {
      table.increments();
      table.text('description');
      table.float('price');
      table.string('name');
      table.integer('shop_id').references('shops.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('drinks');
  }

}

module.exports = DrinkSchema;
