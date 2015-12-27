'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userRewardsCtrlStub = {
  index: 'userRewardsCtrl.index',
  show: 'userRewardsCtrl.show',
  create: 'userRewardsCtrl.create',
  update: 'userRewardsCtrl.update',
  destroy: 'userRewardsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userRewardsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './user_rewards.controller': userRewardsCtrlStub
});

describe('UserRewards API Router:', function() {

  it('should return an express router instance', function() {
    userRewardsIndex.should.equal(routerStub);
  });

  describe('GET /api/user_rewards', function() {

    it('should route to userRewards.controller.index', function() {
      routerStub.get
        .withArgs('/', 'userRewardsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/user_rewards/:id', function() {

    it('should route to userRewards.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'userRewardsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/user_rewards', function() {

    it('should route to userRewards.controller.create', function() {
      routerStub.post
        .withArgs('/', 'userRewardsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/user_rewards/:id', function() {

    it('should route to userRewards.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'userRewardsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/user_rewards/:id', function() {

    it('should route to userRewards.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'userRewardsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/user_rewards/:id', function() {

    it('should route to userRewards.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'userRewardsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
