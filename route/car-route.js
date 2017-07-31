'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Car = require('../model/car.js');

module.exports = function (router) {
  router.get('/api/car', function (req, res) {
    if (req.url.query.id) {
      storage.fetchItem('car', req.url.query.id)
        .then(car => {
          response.sendJSON(res, 200, car);
        })
        .catch(err => {
          response.sendText(res, 404, 'not found');
        });

      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/car', function (req, res) {
    try {
      var car = new Car(req.body.name, req.body.brand);
      storage.createItem('car', car);
      // car - set as the directory (schema name)
      // save the car - get the id off of our car and turn that into a filename
      response.sendJSON(res, 200, car);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
}
