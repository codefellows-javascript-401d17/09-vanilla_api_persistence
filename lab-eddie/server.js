'use strict'

const http = require('http');
const Router = require('./lib/router.js');
const PORT = process.env.PORT || 5000;
const modelPaths = require('./lib/model-paths.js')
const router = new Router();

const modelKeys = Object.keys(modelPaths.models);
modelKeys.forEach(key => {
  modelPaths.allRoutes(key, router);
})

const server = http.createServer(router.route());
  
server.listen(PORT, () => {
  console.log('server on at port:', PORT);
});