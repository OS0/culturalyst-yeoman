'use strict';

var app = require('../..');
var request = require('supertest');

var newSubmedia;

describe('Submedia API:', function() {

  describe('GET /api/submedia', function() {
    var submedias;

    beforeEach(function(done) {
      request(app)
        .get('/api/submedia')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          submedias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      submedias.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/submedia', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/submedia')
        .send({
          name: 'New Submedia',
          info: 'This is the brand new submedia!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSubmedia = res.body;
          done();
        });
    });

    it('should respond with the newly created submedia', function() {
      newSubmedia.name.should.equal('New Submedia');
      newSubmedia.info.should.equal('This is the brand new submedia!!!');
    });

  });

  describe('GET /api/submedia/:id', function() {
    var submedia;

    beforeEach(function(done) {
      request(app)
        .get('/api/submedia/' + newSubmedia._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          submedia = res.body;
          done();
        });
    });

    afterEach(function() {
      submedia = {};
    });

    it('should respond with the requested submedia', function() {
      submedia.name.should.equal('New Submedia');
      submedia.info.should.equal('This is the brand new submedia!!!');
    });

  });

  describe('PUT /api/submedia/:id', function() {
    var updatedSubmedia

    beforeEach(function(done) {
      request(app)
        .put('/api/submedia/' + newSubmedia._id)
        .send({
          name: 'Updated Submedia',
          info: 'This is the updated submedia!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSubmedia = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSubmedia = {};
    });

    it('should respond with the updated submedia', function() {
      updatedSubmedia.name.should.equal('Updated Submedia');
      updatedSubmedia.info.should.equal('This is the updated submedia!!!');
    });

  });

  describe('DELETE /api/submedia/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/submedia/' + newSubmedia._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when submedia does not exist', function(done) {
      request(app)
        .delete('/api/submedia/' + newSubmedia._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
