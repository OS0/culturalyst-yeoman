'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userArtistsCtrlStub = {
  index: 'userArtistsCtrl.index',
  show: 'userArtistsCtrl.show',
  create: 'userArtistsCtrl.create',
  update: 'userArtistsCtrl.update',
  destroy: 'userArtistsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userArtistsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './user_artists.controller': userArtistsCtrlStub
});

describe('UserArtists API Router:', function() {

  it('should return an express router instance', function() {
    userArtistsIndex.should.equal(routerStub);
  });

  describe('GET /api/user_artists', function() {

    it('should route to userArtists.controller.index', function() {
      routerStub.get
        .withArgs('/', 'userArtistsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/user_artists/:id', function() {

    it('should route to userArtists.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'userArtistsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/user_artists', function() {

    it('should route to userArtists.controller.create', function() {
      routerStub.post
        .withArgs('/', 'userArtistsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/user_artists/:id', function() {

    it('should route to userArtists.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'userArtistsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/user_artists/:id', function() {

    it('should route to userArtists.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'userArtistsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/user_artists/:id', function() {

    it('should route to userArtists.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'userArtistsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
