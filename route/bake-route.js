'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Note = require('../model/bake.js');

module.exports = function(router) {
  router.get('/api/bake', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('bake', req.url.query.id)
      .then( bake => {
        response.sendJSON(res, 200, bake);
      })
      // error block
      .catch( () => {
        response.sendText(res, 404, 'not found');
      });

      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/bake', function(req, res) {
    try {
      var note = new Note(req.body.bakedGood, req.body.description, req.body.calories);

      storage.createItem('bake', note);

      response.sendJSON(res, 200, note);
    } catch (err) {
      response.sendText(res, 400, 'bad request');
    }
  });

  router.delete('/api/bake', function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem('bake', req.url.query.id)
      .then( () => {
        response.sendText(res, 204, 'deleted');
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 400, 'bad request');
      });

      return;
    }

    response.sendText(res, 400, 'bad request');
  });
};
