'use strict';

const storage = require('../lib/storage.js');
const returnStatus = require('../lib/response.js');
const Note = require('../model/note.js');

module.exports = (router) => {
  router.get('/api/note', (req, res) => {
    if(req.url.query.id){
      storage.fetchItem('note', req.url.query.id)
      .then((note) => returnStatus.sendJson(res, 200, note))
      .catch((err) => {
        console.error(err);
        returnStatus.sendText(res, 404, 'note note found');
      });
      return;
    }
    returnStatus.sendText(res, 400, 'bad request');
  });

  router.post('/api/note', (req, res) => {
    try{
      let note = new Note(req.body.name, req.body.content);
      storage.createItem('note', note);
      returnStatus.sendJson(res, 200, note);
    }catch(err){
      console.error(err);
      returnStatus.sendText(res, 400, 'bad request');
    }
  });

  router.delete('/api/note', (req, res) => {
    try{
      storage.removeItem('note', req.url.query.id);
      returnStatus.sendJson(res, 202, '');
    }catch(err){
      console.error(err);
      returnStatus.sendText(res, 400, 'bad request');
    }
  });

  router.put('/api/note', (req, res) => {
    try{
      let note = new Note(req.body.name, req.body.content);
      storage.updateItem('note', req.url.query.id, note);
      returnStatus.sendJson(res, 200, JSON.stringify(note));
    }catch(err){
      console.error(err);
      returnStatus.sendText(res, 400, 'bad request');
    }
  });
};
