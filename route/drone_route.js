const response = require('../lib/response.js');
const storage = require('../lib/storage.js');
const Drone = require('../model/drone.js');

module.exports = function (router) {
  router.get('/api/drone', function (req, rsp) {
    if (req.url.query.id) {       //if it can find the id from the request
      storage.fetchItem('drone', req.url.query.id)
        .then((drone) => {
          response.sendJSON(rsp, 200, drone);
        })
        .catch((err) => {
          response.sendText(rsp, 404, 'drone not found');
        })
      return;
    }
    response.sendText(rsp, 400, 'bad request');
  })
  router.post('/api/drone', function (req, rsp) {
    try {
      var drone = new Drone(req.body.model, req.body.rotors);
      storage.createItem('drone', drone);
      response.sendJSON(rsp, 200, drone);
    } catch (err) {
      console.error(err);
      response.sendText(rsp, 400, 'bad request');
    }
  })
  router.delete('/api/drone', function (req, rsp) {
    if (req.url.query.id) {
      storage.deleteItem('drone', req.url.query.id)
        .then(() => {
          rsp.writeHead(204);
          rsp.end();
        })
        .catch((err) => {
          response.sendText(rsp, 400, 'not found');
        })
    }
  })

}
