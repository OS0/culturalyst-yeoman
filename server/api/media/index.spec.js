'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mediaCtrlStub = {
  index: 'mediaCtrl.index',
  show: 'mediaCtrl.show',
  create: 'mediaCtrl.create',
  update: 'mediaCtrl.update',
  destroy: 'mediaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mediaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './media.controller': mediaCtrlStub
});

describe('Media API Router:', function() {

  it('should return an express router instance', function() {
    mediaIndex.should.equal(routerStub);
  });

  describe('GET /api/media', function() {

    it('should route to media.controller.index', function() {
      routerStub.get
        .withArgs('/', 'mediaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  // describe('GET /api/media/:id', function() {

  //   it('should route to media.controller.show', function() {
  //     routerStub.get
  //       .withArgs('/:id', 'mediaCtrl.show')
  //       .should.have.been.calledOnce;
  //   });

  // });

  describe('POST /api/media', function() {

    it('should route to media.controller.create', function() {
      routerStub.post
        .withArgs('/', 'mediaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/media/:id', function() {

    it('should route to media.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'mediaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/media/:id', function() {

    it('should route to media.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'mediaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/media/:id', function() {

    it('should route to media.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'mediaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
