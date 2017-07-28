'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const parseJson = require('./lib/parse-json.js');
const parseUrl = require('./lib/parse-url.js');
const noteRoutes = require('./routes/note-routes.js');
const contactRoutes = require('./routes/contact-routes.js');

const router = new Router();

router.addMiddleware(parseJson);
router.addMiddleware(parseUrl);

noteRoutes(router);
contactRoutes(router);

const PORT = process.env.PORT || 3000;
const server = http.createServer(router.route.bind(router));
server.listen(PORT, function() {
  console.log(`Listening on port ${PORT}.`);
});