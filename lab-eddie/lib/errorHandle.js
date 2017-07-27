'use strict'

const errHandle = module.exports = {};

errHandle.normal = function(paramNames, params) {
  let args = params.length;
  if (paramNames.length !== args) throw new Error(`Expected ${paramNames[args]}`);
}

errHandle.promiseErr = function(paramNames, params) {
  
}