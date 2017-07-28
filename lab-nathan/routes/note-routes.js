'use strict';

require('../lib/response-extensions.js');
const storage = require('../lib/storage.js');
const Note = require('../model/note.js');

module.exports = noteRoutes;

function noteRoutes(router) {
  router.handlePost('/api/note', function(request, response) {
    let note;

    try {
      note = new Note(request.body.name, request.body.content);
    } 
    catch(error) {
      response.sendText(400, 'Posted note was invalid.');
      return;
    }

    storage.add('notes', note)
      .then(() => {
        response.sendJson(200, note);
        return Promise.resolve();
      })
      .catch(error => {
        console.error(error);
        response.sendText(400, 'Posted note was invalid.');
        return Promise.resolve();
      });
  });

  router.handleGet('/api/note', function(request, response) {
    let id = request.url.query.id;

    if (!id) {
      storage.getIds('notes')
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
          response.sendJson(500, 'Could not get note ids.');
          return Promise.resolve();
        });
      
      return;
    }

    storage.get('notes', id)
      .then(note => {
        response.sendJson(200, note);
        return Promise.resolve();
      })
      .catch(() => {
        response.sendText(404, 'Note not found.');
        return Promise.resolve();
      });
  });

  router.handlePut('/api/note', function(request, response) {
    storage.update('notes', request.url.query.id, request.body)
      .then(note => {
        response.sendJson(200, note);
        return Promise.resolve();
      })
      .catch(() => {
        response.sendText(400, 'Bad request.');
        return Promise.resolve();
      });
  });

  router.handleDelete('/api/note', function(request, response) {
    let id = request.url.query.id;

    if (!id) {
      response.sendText(200, 'No id provided.');
      return;
    }

    storage.remove('notes', id)
      .then(() => {
        response.send(204, null, null);
        return Promise.resolve();
      })
      .catch(() => {
        response.sendText(404, 'Note not found.');
        return Promise.resolve();
      });
  });
}