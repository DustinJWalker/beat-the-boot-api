'use strict';

const Shop = use('App/Model/Shop');
const File = use('File');
const snakeCaseKeys = require('snakecase-keys');
const attributes = ['name', 'description', 'picture', 'street', 'city', 'state', 'zip', 'parking', 'phone'];

class ShopController {

  * index(request, response) {
    const shops = yield Shop.with('drink', 'user').fetch();

    response.jsonApi('Shop', shops);
  }

  * store(request, response) {
    const profilePic = request.file('uploadFile', {
      maxSize: '10mb',
      allowedExtensions: ['jpg', 'png', 'jpeg'],
    });

    if (profilePic && profilePic.exists()) {
      const attrs = snakeCaseKeys(request.all());

      yield File.upload(profilePic.clientName(), profilePic);

      const foreignKeys = {
        user_id: request.currentUser.id,
      };
      const shop = yield Shop.create(Object.assign({}, attrs, foreignKeys));

      attrs.profile_pic_url = profilePic.clientName();
      attrs.profile_pic_extension = profilePic.extension();

      shop.fill(attrs);
      yield shop.save();

      return response.jsonApi('Shop', shop);
    }

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    yield request.jsonApi.assertValid(input, this.createRules, this.createMessages);

    const foreignKeys = {
      user_id: request.currentUser.id,
    };
    const shop = yield Shop.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Shop', shop);
  }

  * show(request, response) {
    const id = request.param('id');
    const shop = yield Shop.with('drink', 'user').where({ id }).firstOrFail();

    response.jsonApi('Shop', shop);
  }

  * update(request, response) {
    const profilePic = request.file('uploadFile', {
      maxSize: '10mb',
      allowedExtensions: ['jpg', 'png', 'jpeg'],
    });

    const id = request.param('id');
    const shop = yield Shop.with('drink', 'user').where({ id }).firstOrFail();

    if (profilePic && profilePic.exists()) {
      const attrs = snakeCaseKeys(request.all());

      yield File.upload(profilePic.clientName(), profilePic);

      attrs.profile_pic_url = profilePic.clientName();
      attrs.profile_pic_extension = profilePic.extension();

      shop.fill(attrs);
      yield shop.save();

      return response.jsonApi('Shop', shop);
    }

    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    shop.fill(Object.assign({}, input, foreignKeys));
    yield shop.save();

    response.jsonApi('User', shop);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const shop = yield Shop.query().where({ id }).firstOrFail();
    yield shop.delete();

    response.status(204).send();
  }

}

module.exports = ShopController;
