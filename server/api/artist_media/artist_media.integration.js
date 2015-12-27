'use strict';

var app = require('../..');
var request = require('supertest');

var newArtistMedia;

describe('ArtistMedia API:', function() {

  describe('GET /api/artist_media', function() {
    var artistMedias;

    beforeEach(function(done) {
      request(app)
        .get('/api/artist_media')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          artistMedias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      artistMedias.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/artist_media', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/artist_media')
        .send({
          name: 'New ArtistMedia',
          info: 'This is the brand new artistMedia!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newArtistMedia = res.body;
          done();
        });
    });

    it('should respond with the newly created artistMedia', function() {
      newArtistMedia.name.should.equal('New ArtistMedia');
      newArtistMedia.info.should.equal('This is the brand new artistMedia!!!');
    });

  });

  describe('GET /api/artist_media/:id', function() {
    var artistMedia;

    beforeEach(function(done) {
      request(app)
        .get('/api/artist_media/' + newArtistMedia._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          artistMedia = res.body;
          done();
        });
    });

    afterEach(function() {
      artistMedia = {};
    });

    it('should respond with the requested artistMedia', function() {
      artistMedia.name.should.equal('New ArtistMedia');
      artistMedia.info.should.equal('This is the brand new artistMedia!!!');
    });

  });

  describe('PUT /api/artist_media/:id', function() {
    var updatedArtistMedia

    beforeEach(function(done) {
      request(app)
        .put('/api/artist_media/' + newArtistMedia._id)
        .send({
          name: 'Updated ArtistMedia',
          info: 'This is the updated artistMedia!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedArtistMedia = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedArtistMedia = {};
    });

    it('should respond with the updated artistMedia', function() {
      updatedArtistMedia.name.should.equal('Updated ArtistMedia');
      updatedArtistMedia.info.should.equal('This is the updated artistMedia!!!');
    });

  });

  describe('DELETE /api/artist_media/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/artist_media/' + newArtistMedia._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when artistMedia does not exist', function(done) {
      request(app)
        .delete('/api/artist_media/' + newArtistMedia._id)
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
