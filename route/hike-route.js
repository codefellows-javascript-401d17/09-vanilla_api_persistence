'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Hike = require('../model/hike.js');

module.exports = function(router) {
  router.get('/api/hike', function(req,res) {
    if (req.url.query.id){
      storage.fetchItem('hike', req.url.query.id)
      .then(hike => {
        response.sendJSON(res, 200, hike);
      })
      .catch( err => {
        response.sendText(res, 404, 'not found');
      });

      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/hike', function(req, res){
    try {
      var hike = new Hike(req.body.name, req.body.distance, req.body.difficulty, req.body.description);
      storage.createItem('hike', hike);
      response.sendJSON(res, 200, hike);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
};
