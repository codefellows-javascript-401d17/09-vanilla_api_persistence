'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Beer = require('../model/beer.js');

module.exports = function(router) {
  router.get('/api/beer', function(req,res){
    if(req.url.query.id) {
      storage.fetchItem('beer', req.url.query.id)
      .then (beer => {

        response.sendJSON(res, 200, beer);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
  router.post('/api/beer', function(req, res){
    try {
      var beer = new Beer(req.body.name, req.body.style, req.body.IBU);

      storage.createItem('beer', beer);
      response.sendJSON(res, 200, beer);
    } catch (err){
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  router.delete('/api/beer', function(req, res){
    if (req.url.query.id) {
      storage.deleteItem('beer', req.url.query.id)
      .then( () => {
        response.sendText(res, 204, 'beer deleted');
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'beer not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
};
