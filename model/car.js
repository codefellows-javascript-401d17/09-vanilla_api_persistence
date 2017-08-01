'use strict';
const uuidv4 = require('uuid/v4');

module.exports = function(name, brand) {
  if(!name) throw new Error('expected name');
  if(!brand) throw new Error('expected brand');

  this.id = uuidv4();
  this.name = name;
  this.brand = brand;
};