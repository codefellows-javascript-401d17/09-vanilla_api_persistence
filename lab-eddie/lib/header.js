'use strict'

const exports = module.exports = {};

exports.textHeader = function(res, code, msg) {
  res.writeHeader(code, {
    'Content-Type': 'text/plain'
  });
  res.write(msg);
  res.end();
}

exports.appHeader = function(res, code, json) {
  res.writeHeader(code, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.parse(json.toString()));
  res.end();
}

