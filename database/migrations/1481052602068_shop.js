'use strict';

const Schema = use('Schema');

class ShopSchema extends Schema {

  up() {
    this.create('shops', (table) => {
      table.increments();
      table.string('name');
      table.text('description');
      table.string('picture');
      table.string('street');
      table.string('city');
      table.string('state');
      table.string('zip');
      table.json('parking');
      table.string('phone');
      
      table.integer('user_id').references('users.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('shops');
  }

}

module.exports = ShopSchema;
