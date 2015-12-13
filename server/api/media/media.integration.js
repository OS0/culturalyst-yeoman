'use strict';

var app = require('../..');
var request = require('supertest');

var newMedia;

describe('Media API:', function() {

  describe('GET /api/media', function() {
    var medias;

    beforeEach(function(done) {
      request(app)
        .get('/api/media')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          medias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      medias.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/media', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/media')
        .send({
          name: 'New Media',
          info: 'This is the brand new media!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newMedia = res.body;
          done();
        });
    });

    it('should respond with the newly created media', function() {
      newMedia.name.should.equal('New Media');
      newMedia.info.should.equal('This is the brand new media!!!');
    });

  });

  describe('GET /api/media/:id', function() {
    var media;

    beforeEach(function(done) {
      request(app)
        .get('/api/media/' + newMedia._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          media = res.body;
          done();
        });
    });

    afterEach(function() {
      media = {};
    });

    it('should respond with the requested media', function() {
      media.name.should.equal('New Media');
      media.info.should.equal('This is the brand new media!!!');
    });

  });

  describe('PUT /api/media/:id', function() {
    var updatedMedia

    beforeEach(function(done) {
      request(app)
        .put('/api/media/' + newMedia._id)
        .send({
          name: 'Updated Media',
          info: 'This is the updated media!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMedia = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMedia = {};
    });

    it('should respond with the updated media', function() {
      updatedMedia.name.should.equal('Updated Media');
      updatedMedia.info.should.equal('This is the updated media!!!');
    });

  });

  describe('DELETE /api/media/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/media/' + newMedia._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when media does not exist', function(done) {
      request(app)
        .delete('/api/media/' + newMedia._id)
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
