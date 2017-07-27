'use strict'

const http = require('http');
const Router = require('./lib/router.js');
const PORT = process.env.PORT || 5000;
const modelPaths = require('./lib/model-paths.js')
const router = new Router();

modelPaths.allRoutes('person', router);
modelPaths.allRoutes('car', router);
modelPaths.allRoutes('dog', router);

const server = http.createServer(router.route());
  
server.listen(PORT, () => {
  console.log('server on at port:', PORT);
});