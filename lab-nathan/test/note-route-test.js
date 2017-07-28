'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Note Routes', function() {
  let note = null;
  
  describe('POST: /api/note', function() {
    it('should return a note', function(done) {
      request.post('localhost:8000/api/note')
        .send({
          name: 'test name',
          content: 'test content'
        })
        .end(function(err, response) {
          if (err) {
            return done(err);
          }

          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal('test name');
          expect(response.body.content).to.equal('test content');

          note = response.body;
          
          done();
        });
    });

    it('should respond with bad request if no request body was provided or the body was invalid', function(done) {
      request.post('localhost:8000/api/note')
        .send({
          eman: 'eman tset',
          tnetnoc: 'tnetnoc tset'
        })
        .end(function(error) {
          expect(error.status).to.equal(400);
          expect(error.response.text).to.equal('Posted note was invalid.');

          done();
        });
    });

    
  });

  describe('GET: /api/note', function() {
    it('should return a note', function(done) {
      request.get(`localhost:8000/api/note?id=${note.id}`)
        .end(function(err, response){
          if (err) {
            return done(err);
          }

          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal('test name');
          expect(response.body.content).to.equal('test content');

          done();
        });
    });

    it('should return a status code of 404 for routes that have not been registered', function(done) {
      request.get('localhost:8000/api/dinosaurs')
        .end(function(error) {
          expect(error.status).to.equal(404);
          expect(error.response.text).to.equal('Route not found.');

          done();
        });
    });

    it('should respond with not found for valid requests made with an id that was not found', function(done) {
      request.get('localhost:8000/api/note?id=100')
        .end(function(error) {
          expect(error.status).to.equal(404);
          expect(error.response.text).to.equal('Note not found.');

          done();
        });
    });

    it('it should respond with an array of all ids if no id was provided in the request', function(done) {
      request.get('localhost:8000/api/note')
        .end(function(error, response) {
          expect(response.body).to.deep.equal([ `${note.id}` ]);

          done();
        });
    });
  });

  describe('PUT: /api/note', function() {
    it('should return an updated note', function(done) {
      request.put(`localhost:8000/api/note?id=${note.id}`)
        .send({
          name: 'abraham',
          content: 'abraham lincoln was a president.',
        })
        .end(function(err, response){
          if (err) {
            return done(err);
          }

          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal('abraham');
          expect(response.body.content).to.equal('abraham lincoln was a president.');

          done();
        });
    });

    it('should return a status code of 404 for routes that have not been registered', function(done) {
      request.put('localhost:8000/api/dinosaurs')
        .end(function(error) {
          expect(error.status).to.equal(404);
          expect(error.response.text).to.equal('Route not found.');

          done();
        });
    });

    it('should respond with bad request for invalid requests', function(done) {
      request.put('localhost:8000/api/note?id=100')
        .end(function(error) {
          expect(error.status).to.equal(400);
          expect(error.response.text).to.equal('Bad request.');

          done();
        });
    });
  });

  describe('DELETE: /api/note', function() {
    it('should delete a note', function(done) {
      request.delete(`localhost:8000/api/note?id=${note.id}`)
        .end(function(error, response){
          if (error) {
            return done(error);
          }

          expect(response.status).to.equal(204);

          done();
        });
    });
  });
});