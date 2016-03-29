'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userRewardCtrlStub = {
  index: 'userRewardCtrl.index',
  show: 'userRewardCtrl.show',
  create: 'userRewardCtrl.create',
  update: 'userRewardCtrl.update',
  destroy: 'userRewardCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userRewardIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './user_reward.controller': userRewardCtrlStub
});

describe('UserReward API Router:', function() {

  it('should return an express router instance', function() {
    userRewardIndex.should.equal(routerStub);
  });

  describe('GET /api/user_rewards', function() {

    it('should route to userReward.controller.index', function() {
      routerStub.get
        .withArgs('/', 'userRewardCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/user_rewards/:id', function() {

    it('should route to userReward.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'userRewardCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/user_rewards', function() {

    it('should route to userReward.controller.create', function() {
      routerStub.post
        .withArgs('/', 'userRewardCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/user_rewards/:id', function() {

    it('should route to userReward.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'userRewardCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/user_rewards/:id', function() {

    it('should route to userReward.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'userRewardCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/user_rewards/:id', function() {

    it('should route to userReward.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'userRewardCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
