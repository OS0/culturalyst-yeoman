'use strict';

var app = require('../..');
var request = require('supertest');

var newUserRewards;

describe('UserRewards API:', function() {

  describe('GET /api/user_rewards', function() {
    var userRewardss;

    beforeEach(function(done) {
      request(app)
        .get('/api/user_rewards')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          userRewardss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      userRewardss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/user_rewards', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/user_rewards')
        .send({
          name: 'New UserRewards',
          info: 'This is the brand new userRewards!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newUserRewards = res.body;
          done();
        });
    });

    it('should respond with the newly created userRewards', function() {
      newUserRewards.name.should.equal('New UserRewards');
      newUserRewards.info.should.equal('This is the brand new userRewards!!!');
    });

  });

  describe('GET /api/user_rewards/:id', function() {
    var userRewards;

    beforeEach(function(done) {
      request(app)
        .get('/api/user_rewards/' + newUserRewards._id)
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

    afterEach(function() {
      userRewards = {};
    });

    it('should respond with the requested userRewards', function() {
      userRewards.name.should.equal('New UserRewards');
      userRewards.info.should.equal('This is the brand new userRewards!!!');
    });

  });

  describe('PUT /api/user_rewards/:id', function() {
    var updatedUserRewards

    beforeEach(function(done) {
      request(app)
        .put('/api/user_rewards/' + newUserRewards._id)
        .send({
          name: 'Updated UserRewards',
          info: 'This is the updated userRewards!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUserRewards = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUserRewards = {};
    });

    it('should respond with the updated userRewards', function() {
      updatedUserRewards.name.should.equal('Updated UserRewards');
      updatedUserRewards.info.should.equal('This is the updated userRewards!!!');
    });

  });

  describe('DELETE /api/user_rewards/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/user_rewards/' + newUserRewards._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when userRewards does not exist', function(done) {
      request(app)
        .delete('/api/user_rewards/' + newUserRewards._id)
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
