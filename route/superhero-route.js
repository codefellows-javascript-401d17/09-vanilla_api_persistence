'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Superhero = require('../model/superhero.js');

module.exports = function(router) {
  router.get('/api/superhero', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('superhero', req.url.query.id)
      .then( superhero => {
        response.sendJSON(res, 200, superhero);
      })
      .catch( () => {
        response.sendText(res, 404, 'superhero not found');
      });

      return;
    }

    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/superhero', function(req, res) {
    try {
      var superhero = new Superhero(req.body.name, req.body.comicUni);
      storage.createItem('superhero', superhero);
      response.sendJSON(res, 200, superhero);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
};
