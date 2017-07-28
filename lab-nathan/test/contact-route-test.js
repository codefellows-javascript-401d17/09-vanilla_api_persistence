'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Contact Routes', function() {
  let contact = null;
  
  describe('POST: /api/contact', function() {
    it('should return a contact', function(done) {
      request.post('localhost:8000/api/contact')
        .send({
          firstName: 'bob',
          lastName: 'vila',
          email: 'bob@vila.com',
          phone: '1-800-BOB-VILA'
        })
        .end(function(err, response) {
          if (err) {
            return done(err);
          }

          expect(response.status).to.equal(200);
          expect(response.body.firstName).to.equal('bob');
          expect(response.body.lastName).to.equal('vila');
          expect(response.body.email).to.equal('bob@vila.com');
          expect(response.body.phone).to.equal('1-800-BOB-VILA');

          contact = response.body;
          
          done();
        });
    });

    it('should respond with bad request if no request body was provided or the body was invalid', function(done) {
      request.post('localhost:8000/api/contact')
        .send({
          gobble: 'gobble'
        })
        .end(function(error) {
          expect(error.status).to.equal(400);
          expect(error.response.text).to.equal('Posted contact was invalid.');

          done();
        });
    });

    
  });

  describe('GET: /api/contact', function() {
    it('should return a contact', function(done) {
      request.get(`localhost:8000/api/contact?id=${contact.id}`)
        .end(function(err, response){
          if (err) {
            return done(err);
          }

          expect(response.status).to.equal(200);
          expect(response.body.firstName).to.equal('bob');
          expect(response.body.lastName).to.equal('vila');
          expect(response.body.email).to.equal('bob@vila.com');
          expect(response.body.phone).to.equal('1-800-BOB-VILA');

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
      request.get('localhost:8000/api/contact?id=100')
        .end(function(error) {
          expect(error.status).to.equal(404);
          expect(error.response.text).to.equal('Contact not found.');

          done();
        });
    });

    it('it should respond with an array of all ids if no id was provided in the request', function(done) {
      request.get('localhost:8000/api/contact')
        .end(function(error, response) {
          expect(response.body).to.deep.equal([ `${contact.id}` ]);

          done();
        });
    });
  });

  describe('PUT: /api/contact', function() {
    it('should return an updated contact', function(done) {
      request.put(`localhost:8000/api/contact?id=${contact.id}`)
        .send({
          firstName: 'abraham',
          lastName: 'lincoln',
          email: 'abraham@lincoln.com',
          phone: '1-800-ABRAHAM'
        })
        .end(function(err, response){
          if (err) {
            return done(err);
          }

          expect(response.status).to.equal(200);
          expect(response.body.firstName).to.equal('abraham');
          expect(response.body.lastName).to.equal('lincoln');
          expect(response.body.email).to.equal('abraham@lincoln.com');
          expect(response.body.phone).to.equal('1-800-ABRAHAM');

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
      request.put('localhost:8000/api/contact?id=100')
        .end(function(error) {
          expect(error.status).to.equal(400);
          expect(error.response.text).to.equal('Bad request.');

          done();
        });
    });
  });

  describe('DELETE: /api/contact', function() {
    it('should delete a contact', function(done) {
      request.delete(`localhost:8000/api/contact?id=${contact.id}`)
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