'use strict';

var app = require('../..');
var request = require('supertest');

var newContent;

describe('Content API:', function() {

  describe('GET /api/content', function() {
    var contents;

    beforeEach(function(done) {
      request(app)
        .get('/api/content')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          contents = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      contents.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/content', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/content')
        .send({
          name: 'New Content',
          info: 'This is the brand new content!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newContent = res.body;
          done();
        });
    });

    it('should respond with the newly created content', function() {
      newContent.name.should.equal('New Content');
      newContent.info.should.equal('This is the brand new content!!!');
    });

  });

  describe('GET /api/content/:id', function() {
    var content;

    beforeEach(function(done) {
      request(app)
        .get('/api/content/' + newContent._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          content = res.body;
          done();
        });
    });

    afterEach(function() {
      content = {};
    });

    it('should respond with the requested content', function() {
      content.name.should.equal('New Content');
      content.info.should.equal('This is the brand new content!!!');
    });

  });

  describe('PUT /api/content/:id', function() {
    var updatedContent

    beforeEach(function(done) {
      request(app)
        .put('/api/content/' + newContent._id)
        .send({
          name: 'Updated Content',
          info: 'This is the updated content!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedContent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedContent = {};
    });

    it('should respond with the updated content', function() {
      updatedContent.name.should.equal('Updated Content');
      updatedContent.info.should.equal('This is the updated content!!!');
    });

  });

  describe('DELETE /api/content/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/content/' + newContent._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when content does not exist', function(done) {
      request(app)
        .delete('/api/content/' + newContent._id)
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
