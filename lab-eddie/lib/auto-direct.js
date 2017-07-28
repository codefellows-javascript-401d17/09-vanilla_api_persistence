'use strict'

const fs = require('fs')

const autoDataDir = module.exports = function(models) {
  let labDir = fs.readdirSync('..');
  if (!labDir.includes('data')) fs.mkdirSync('../data');
  if (fs.readdirSync('../data').length === 0) autoModelDir(models);
};

const autoModelDir = function(models) {
  let modelKeys = Object.keys(models);
  modelKeys.forEach(key => fs.mkdirSync(`../data/${key}`));
}
