'use strict';

const uuidv4 = require('uuid/v4');
const errHandle = require('../lib/errorHandle.js');

module.exports = function(name, healthPoints, experience, level) {
  errHandle.normal(['name', 'healthPoints', 'experience', 'level'], arguments);

  this.id = uuidv4();
  this.name = name;
  this.healthPoints = healthPoints;
  this.experience = experience;
  this.level = level
  
};