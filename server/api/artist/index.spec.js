'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var artistCtrlStub = {
  index: 'artistCtrl.index',
  show: 'artistCtrl.show',
  create: 'artistCtrl.create',
  update: 'artistCtrl.update',
  destroy: 'artistCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var artistIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './artist.controller': artistCtrlStub
});

describe('Artist API Router:', function() {

  it('should return an express router instance', function() {
    artistIndex.should.equal(routerStub);
  });

  describe('GET /api/artist', function() {

    it('should route to artist.controller.index', function() {
      routerStub.get
        .withArgs('/', 'artistCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/artist/:id', function() {

    it('should route to artist.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'artistCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/artist', function() {

    it('should route to artist.controller.create', function() {
      routerStub.post
        .withArgs('/', 'artistCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/artist/:id', function() {

    it('should route to artist.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'artistCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/artist/:id', function() {

    it('should route to artist.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'artistCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/artist/:id', function() {

    it('should route to artist.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'artistCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
