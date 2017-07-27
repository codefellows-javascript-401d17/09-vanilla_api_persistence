'use strict';

const storage = require('./storage.js');
const Person = require('../model/person.js');
const Car = require('../model/car.js');
const Dog = require('../model/dog.js')


const modelRoutes = module.exports = {};

modelRoutes.models = {
  person : Person,
  car: Car,
  dog: Dog
}


modelRoutes.allRoutes = function(model, router) {
  modelRoutes.modelGet(model, router);
  modelRoutes.modelDelete(model, router);
  modelRoutes.modelPost(model, router);
}


modelRoutes.modelGet = function(model,router) {
  router.get(`/api/${model}`, function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem(`${model}`, req.url.query.id)
      .then( person => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        res.write(JSON.stringify(person));
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write(`${model} not found`);
        res.end();
      });

      return;
    } else if (req.url.query) {
      storage.fetchItem(`${model}`)
      .then( person => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        res.write(JSON.stringify(person));
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write(`${model} not found`);
        res.end();
      });

      return;
    };

    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  });
};

modelRoutes.modelPost = function(model, router) {
  router.post(`/api/${model}`, function(req, res) {
    try {
      let params = [];
      for(let key in req.body) {
        params.push(req.body[key]);
      }
      var newObj = new modelRoutes.models[model](...params);
      console.log('New Object:    ', newObj)
      storage.createItem(`${model}`, newObj);
      res.writeHead(200, {
        'Content-Type' : 'application/json'
      });
      res.write(JSON.stringify(newObj));
      res.end();
    } catch (err) {
      console.error(err);
      res.writeHead(400, {
        'Content-Type' : 'text/plain'
      });
      res.write('bad request');
      res.end();
    }
  });
}

modelRoutes.modelDelete = function(model, router) {

  router.delete(`/api/${model}`, function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem(`${model}`, req.url.query.id)
      .then( person => {
        res.writeHead(202, {
          'Content-Type': 'application/json'
        });

        res.write(JSON.stringify(person));
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write(`${model} not found`);
        res.end();
      });

      return;
    };

    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  });

}