'use strict';

const uuidv4 = require('uuid/v4');
const errHandle = require('../lib/errorHandle.js');

module.exports = function(name, position, pay) {
  errHandle.normal(['name', 'position', 'pay'], arguments);

  this.id = uuidv4();
  this.name = name;
  this.position = position;
  this.pay = pay;
  this.fired = false
  
};