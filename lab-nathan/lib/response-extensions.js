'use strict';

const http = require('http');

http.ServerResponse.prototype.sendJson = function(statusCode, item) {
  this.send(statusCode, JSON.stringify(item), 'application/json');
};

http.ServerResponse.prototype.sendText = function(statusCode, message) {
  this.send(statusCode, message);
};

http.ServerResponse.prototype.send = function(statusCode, message, contentType = 'text/plain') {
  if (contentType) {
    let headers = {
      'Content-Type': contentType
    };

    this.writeHead(statusCode, headers);
  }
  else {
    this.writeHead(statusCode);
  }

  if (message) {
    this.write(message);
  }

  this.end();
};