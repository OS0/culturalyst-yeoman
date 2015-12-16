'use strict';

var app = require('../..');
var request = require('supertest');

var newTest;

describe('Test API:', function() {

  describe('GET /api/tests', function() {
    var tests;

    beforeEach(function(done) {
      request(app)
        .get('/api/tests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          tests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tests.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tests')
        .send({
          name: 'New Test',
          info: 'This is the brand new test!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newTest = res.body;
          done();
        });
    });

    it('should respond with the newly created test', function() {
      newTest.name.should.equal('New Test');
      newTest.info.should.equal('This is the brand new test!!!');
    });

  });

  describe('GET /api/tests/:id', function() {
    var test;

    beforeEach(function(done) {
      request(app)
        .get('/api/tests/' + newTest._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          test = res.body;
          done();
        });
    });

    afterEach(function() {
      test = {};
    });

    it('should respond with the requested test', function() {
      test.name.should.equal('New Test');
      test.info.should.equal('This is the brand new test!!!');
    });

  });

  describe('PUT /api/tests/:id', function() {
    var updatedTest

    beforeEach(function(done) {
      request(app)
        .put('/api/tests/' + newTest._id)
        .send({
          name: 'Updated Test',
          info: 'This is the updated test!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTest = {};
    });

    it('should respond with the updated test', function() {
      updatedTest.name.should.equal('Updated Test');
      updatedTest.info.should.equal('This is the updated test!!!');
    });

  });

  describe('DELETE /api/tests/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tests/' + newTest._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when test does not exist', function(done) {
      request(app)
        .delete('/api/tests/' + newTest._id)
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
