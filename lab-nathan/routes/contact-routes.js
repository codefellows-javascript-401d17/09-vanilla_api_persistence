'use strict';

require('../lib/response-extensions.js');
const storage = require('../lib/storage.js');
const Contact = require('../model/contact.js');

module.exports = contactRoutes;

function contactRoutes(router) {
  router.handlePost('/api/contact', function(request, response) {
    let contact;

    try {
      contact = new Contact(request.body.firstName, request.body.lastName, request.body.email, request.body.phone);
    } 
    catch(error) {
      response.sendText(400, 'Posted contact was invalid.');
      return;
    }

    storage.add('contacts', contact)
      .then(() => {
        response.sendJson(200, contact);
        return Promise.resolve();
      })
      .catch(() => {
        response.sendText(400, 'Posted contact was invalid.');
        return Promise.resolve();
      });
  });

  router.handleGet('/api/contact', function(request, response) {
    let id = request.url.query.id;

    if (!id) {
      storage.getIds('contacts')
        .then(files => {
          files = files.map(file => {
            let fileParts = file.split('.');
            fileParts.pop();
            return fileParts.join('.');
          });

          response.sendJson(200, files);
          return Promise.resolve();
        })
        .catch(() => {
          response.sendJson(500, 'Could not get contact ids.');
          return Promise.resolve();
        });
      
      return;
    }

    storage.get('contacts', id)
      .then(contact => {
        response.sendJson(200, contact);
        return Promise.resolve();
      })
      .catch(() => {
        response.sendText(404, 'Contact not found.');
        return Promise.resolve();
      });
  });

  router.handlePut('/api/contact', function(request, response) {
    storage.update('contacts', request.url.query.id, request.body)
      .then(contact => {
        response.sendJson(200, contact);
        return Promise.resolve();
      })
      .catch(() => {
        response.sendText(400, 'Bad request.');
        return Promise.resolve();
      });
  });

  router.handleDelete('/api/contact', function(request, response) {
    let id = request.url.query.id;

    if (!id) {
      response.sendText(200, 'No id provided.');
      return;
    }

    storage.remove('contacts', id)
      .then(() => {
        response.send(204, null, null);
        return Promise.resolve();
      })
      .catch(() => {
        response.sendText(404, 'Contact not found.');
        return Promise.resolve();
      });
  });
}