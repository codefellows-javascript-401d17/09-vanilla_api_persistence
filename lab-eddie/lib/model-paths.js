'use strict';

const storage = require('./storage.js');
const header = require('./header.js')
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
      .then( item => {
        header.appHeader(res, 200, item);
      })
      .catch( err => {
        console.error(err);
        header.textHeader(res, 404, `${model} not found!`)
      });

      return;
    } else if (req.url.query) {
      storage.fetchItem(`${model}`)
      .then( item => {
        header.appHeader(res, 200, item);
      })
      .catch( err => {
        console.error(err);
        header.textHeader(res, 400, 'Bad request!')
      });

      return;
    };

    header.textHeader(res, 400, 'Bad request!')
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

      storage.createItem(`${model}`, newObj);
      header.appHeader(res, 200, newObj);
      
    } catch (err) {
      console.error(err);
      header.textHeader(res, 400, 'Bad request!')
    }
  });
}

modelRoutes.modelDelete = function(model, router) {

  router.delete(`/api/${model}`, function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem(`${model}`, req.url.query.id)
      .then( item => {
        header.appHeader(res, 200, item);
      })
      .catch( err => {
        console.error(err);
        header.textHeader(res, 404, `${model} not found!`)
      });

      return;
    };

    header.textHeader(res, 400, 'Bad request!')
  });

}