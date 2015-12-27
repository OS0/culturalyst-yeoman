'use strict';

var app = require('../..');
var request = require('supertest');

var newUserArtists;

describe('UserArtists API:', function() {

  describe('GET /api/user_artists', function() {
    var userArtistss;

    beforeEach(function(done) {
      request(app)
        .get('/api/user_artists')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          userArtistss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      userArtistss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/user_artists', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/user_artists')
        .send({
          name: 'New UserArtists',
          info: 'This is the brand new userArtists!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newUserArtists = res.body;
          done();
        });
    });

    it('should respond with the newly created userArtists', function() {
      newUserArtists.name.should.equal('New UserArtists');
      newUserArtists.info.should.equal('This is the brand new userArtists!!!');
    });

  });

  describe('GET /api/user_artists/:id', function() {
    var userArtists;

    beforeEach(function(done) {
      request(app)
        .get('/api/user_artists/' + newUserArtists._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          userArtists = res.body;
          done();
        });
    });

    afterEach(function() {
      userArtists = {};
    });

    it('should respond with the requested userArtists', function() {
      userArtists.name.should.equal('New UserArtists');
      userArtists.info.should.equal('This is the brand new userArtists!!!');
    });

  });

  describe('PUT /api/user_artists/:id', function() {
    var updatedUserArtists

    beforeEach(function(done) {
      request(app)
        .put('/api/user_artists/' + newUserArtists._id)
        .send({
          name: 'Updated UserArtists',
          info: 'This is the updated userArtists!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUserArtists = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUserArtists = {};
    });

    it('should respond with the updated userArtists', function() {
      updatedUserArtists.name.should.equal('Updated UserArtists');
      updatedUserArtists.info.should.equal('This is the updated userArtists!!!');
    });

  });

  describe('DELETE /api/user_artists/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/user_artists/' + newUserArtists._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when userArtists does not exist', function(done) {
      request(app)
        .delete('/api/user_artists/' + newUserArtists._id)
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
