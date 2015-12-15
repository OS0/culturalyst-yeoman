'use strict';

var app = require('../..');
var request = require('supertest');

var newArtist;

describe('Artist API:', function() {

  describe('GET /api/artist', function() {
    var artists;

    beforeEach(function(done) {
      request(app)
        .get('/api/artist')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          artists = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      artists.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/artist', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/artist')
        .send({
          name: 'New Artist',
          info: 'This is the brand new artist!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newArtist = res.body;
          done();
        });
    });

    it('should respond with the newly created artist', function() {
      newArtist.name.should.equal('New Artist');
      newArtist.info.should.equal('This is the brand new artist!!!');
    });

  });

  describe('GET /api/artist/:id', function() {
    var artist;

    beforeEach(function(done) {
      request(app)
        .get('/api/artist/' + newArtist._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          artist = res.body;
          done();
        });
    });

    afterEach(function() {
      artist = {};
    });

    it('should respond with the requested artist', function() {
      artist.name.should.equal('New Artist');
      artist.info.should.equal('This is the brand new artist!!!');
    });

  });

  describe('PUT /api/artist/:id', function() {
    var updatedArtist

    beforeEach(function(done) {
      request(app)
        .put('/api/artist/' + newArtist._id)
        .send({
          name: 'Updated Artist',
          info: 'This is the updated artist!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedArtist = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedArtist = {};
    });

    it('should respond with the updated artist', function() {
      updatedArtist.name.should.equal('Updated Artist');
      updatedArtist.info.should.equal('This is the updated artist!!!');
    });

  });

  describe('DELETE /api/artist/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/artist/' + newArtist._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when artist does not exist', function(done) {
      request(app)
        .delete('/api/artist/' + newArtist._id)
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
