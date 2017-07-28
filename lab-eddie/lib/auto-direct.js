'use strict'

const fs = require('fs')

const autoDataDir = module.exports = function(models) {
  let labDir = fs.readdirSync('.');
  console.log(Object.keys(models).length)
  if (!labDir.includes('data')) fs.mkdirSync('./data');
  autoModelDir(models);
};

const autoModelDir = function(models) {
  let modelKeys = Object.keys(models);
  let dataDir = fs.readdirSync('./data');
  modelKeys.forEach(key => {
    if(!dataDir.includes(key)) fs.mkdirSync(`./data/${key}`)
  });
}
