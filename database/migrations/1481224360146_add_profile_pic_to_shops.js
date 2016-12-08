'use strict';

const Schema = use('Schema');

class AddProfilePicToShopsTableSchema extends Schema {

  up() {
    this.table('shops', (table) => {
      table.string('profile_pic_url');
      table.string('profile_pic_extension');
    });
  }

  down() {
    this.table('shops', (table) => {
      table.dropColumn('profile_pic_url');
      table.dropColumn('profile_pic_extension');
    });
  }

}

module.exports = AddProfilePicToShopsTableSchema;
