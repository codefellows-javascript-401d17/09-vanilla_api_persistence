'use strict';

const fsPromises = require('./fs-promises.js');

let storage = {};

module.exports = storage;

storage.add = function(categoryName, item) {
  if (!categoryName) {
    return Promise.reject(new Error('expected schema name'));
  }

  if (!item) {
    return Promise.reject(new Error('expected item'));
  }

  return fsPromises.createDirectory(`${__dirname}/../data`)
    .then(fsPromises.createDirectory(`${__dirname}/../data/${categoryName}`))
    .then(fsPromises.writeFile(`${__dirname}/../data/${categoryName}/${item.id}.json`, JSON.stringify(item)))
    .then(Promise.resolve(item));
};

storage.get = function(categoryName, id) {
  if (!categoryName) {
    return Promise.reject(new Error('expected schema name'));
  }

  if (!id) {
    return Promise.reject(new Error('expected id'));
  }

  return fsPromises.readFile(`${__dirname}/../data/${categoryName}/${id}.json`)
    .then(buffer => {
      try {
        let jsonString = buffer.toString();
        let item = JSON.parse(jsonString);
        return Promise.resolve(item);
      }
      catch(error) {
        return Promise.reject(error);
      }
    });
};

storage.update = function(categoryName, id, data) {
  return storage.get(categoryName, id)
    .then(item => {
      for (let propertyName in data) {
        if (item[propertyName]) {
          item[propertyName] = data[propertyName];
        }
      }

      return Promise.resolve(item);
    });
};

storage.remove = function(categoryName, id) {
  return fsPromises.deleteFile(`${__dirname}/../data/${categoryName}/${id}.json`);
};

storage.getIds = function(categoryName) {
  return fsPromises.readDirectory(`${__dirname}/../data/${categoryName}`);
};