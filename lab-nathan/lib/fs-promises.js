'use strict';

const fs = require('fs');

let fsPromises = {};

module.exports = fsPromises;

fsPromises.readDirectory = function(directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, function(error, files) {
      if (error) {
        return reject(error);
      }

      resolve(files);
    });
  });
};

fsPromises.createDirectory = function(directory) {
  return new Promise((resolve, reject) => {
    fs.mkdir(directory, function(error) {
      if (error && error.code !== 'EEXIST') {
        return reject(error);
      }

      resolve();
    });
  });
};

fsPromises.readFile = function(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function(error, buffer) {
      if (error) {
        return reject(error);
      }

      resolve(buffer);
    });
  });
};

fsPromises.writeFile = function(filePath, item) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, item, function(error) {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
};

fsPromises.deleteFile = function(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, function(error) {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
};

