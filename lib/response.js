'use strict';

module.exports = exports = {};

module.exports.sendJSON = function(rsp, status, data) {
  rsp.writeHead(status, {
    'Content-Type' : 'application/json'
  });
  rsp.write(JSON.stringify(data));
  rsp.end();
}

module.exports.sendText = function(rsp, status, msg) {
  rsp.writeHead(status, {
    'Content-Type' : 'text/plain'
  });
  rsp.write(msg);
  rsp.end();
}