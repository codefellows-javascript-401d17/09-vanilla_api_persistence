'use strict'

const header = module.exports = {};

header.textHeader = function(res, code, msg) {
  res.writeHeader(code, {
    'Content-Type': 'text/plain'
  });
  res.write(msg);
  res.end();
}

header.appHeader = function(res, code, json) {
  res.writeHeader(code, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(json));
  res.end();
}

