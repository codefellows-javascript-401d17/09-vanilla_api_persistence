'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Pr'});

module.exports = exports = {};

exports.createItem = (schemaName, item) => {
  if(!schemaName) return Promise.reject(new Error('no schemaName given'));
  if(!item) return Promise.reject(new Error('no item given'));

  return fs.writeFilePr(`${__dirname}/../data/${schemaName}/${item.id}.json`, JSON.stringify(item))
  .then(() => item)
  .catch((err) => Promise.reject(err));
};

exports.fetchItem = (schemaName, id) => {
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
  if(!id) return Promise.reject(new Error('expected id'));

  return fs.readFilePr(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then((data) => {
    try{
      return JSON.parse(data.toString());
    }catch(err){
      return Promise.reject(err);
    }
  })
  .catch((err) => Promise.reject(err));
};

exports.removeItem = (schemaName, id) => {
  if(!schemaName) return Promise.reject(new Error('no schemaName given'));
  if(!id) return Promise.reject(new Error('no id given'));

  return fs.unlinkPr(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch((err) => Promise.reject(err));
};

exports.updateItem = (schemaName, id, input) => {
  if(!schemaName) return Promise.reject(new Error('no schemaName given'));
  if(!id) return Promise.reject(new Error('no id given'));
  if(!input) return Promise.reject(new Error('no content given'));
  console.log(id);
  console.log(input);
  return fs.writeFilePr(`${__dirname}/../data/${schemaName}/${id}.json`, JSON.stringify(input))
  .then(() => input)
  .catch((err) => Promise.reject(err));
};
