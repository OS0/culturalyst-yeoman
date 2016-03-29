'use strict';

var app = require('../..');
var request = require('supertest');

var newUserReward;

describe('UserReward API:', function() {

  describe('GET /api/user_rewards', function() {
    var userRewards;

    beforeEach(function(done) {
      request(app)
        .get('/api/user_rewards')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          userRewards = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      userRewards.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/user_rewards', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/user_rewards')
        .send({
          name: 'New UserReward',
          info: 'This is the brand new userReward!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newUserReward = res.body;
          done();
        });
    });

    it('should respond with the newly created userReward', function() {
      newUserReward.name.should.equal('New UserReward');
      newUserReward.info.should.equal('This is the brand new userReward!!!');
    });

  });

  describe('GET /api/user_rewards/:id', function() {
    var userReward;

    beforeEach(function(done) {
      request(app)
        .get('/api/user_rewards/' + newUserReward._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          userReward = res.body;
          done();
        });
    });

    afterEach(function() {
      userReward = {};
    });

    it('should respond with the requested userReward', function() {
      userReward.name.should.equal('New UserReward');
      userReward.info.should.equal('This is the brand new userReward!!!');
    });

  });

  describe('PUT /api/user_rewards/:id', function() {
    var updatedUserReward

    beforeEach(function(done) {
      request(app)
        .put('/api/user_rewards/' + newUserReward._id)
        .send({
          name: 'Updated UserReward',
          info: 'This is the updated userReward!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUserReward = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUserReward = {};
    });

    it('should respond with the updated userReward', function() {
      updatedUserReward.name.should.equal('Updated UserReward');
      updatedUserReward.info.should.equal('This is the updated userReward!!!');
    });

  });

  describe('DELETE /api/user_rewards/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/user_rewards/' + newUserReward._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when userReward does not exist', function(done) {
      request(app)
        .delete('/api/user_rewards/' + newUserReward._id)
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
