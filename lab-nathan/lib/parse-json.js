'use strict';

module.exports = parseJson;

function parseJson(request) {
  return new Promise((resolve, reject) => {
    if (request.method !== 'POST' && request.method !== 'PUT') {
      resolve();
      return;
    }

    let body = '';

    request.on('data', function(buffer) {
      body += buffer.toString();
    });

    request.on('end', () => {
      if (!body) {
        resolve(request);
        return;
      }

      try {
        request.body = JSON.parse(body);
        resolve(request);
      }
      catch (error) {
        reject(error);
      }
    });

    request.on('error', function(error) {
      reject(error);
    });
  });
}
