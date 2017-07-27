'use strict';

const
http = require('http'),
Router = require('./lib/router.js'),
PORT = process.env.PORT || 3000;
// const router = new Router();

const server = http.createServer();

server.listen(PORT, () => {
console.log('server up:', PORT);
});
