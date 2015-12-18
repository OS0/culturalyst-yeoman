'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var contentCtrlStub = {
  index: 'contentCtrl.index',
  show: 'contentCtrl.show',
  create: 'contentCtrl.create',
  update: 'contentCtrl.update',
  destroy: 'contentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var contentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './content.controller': contentCtrlStub
});

describe('Content API Router:', function() {

  it('should return an express router instance', function() {
    contentIndex.should.equal(routerStub);
  });

  describe('GET /api/content', function() {

    it('should route to content.controller.index', function() {
      routerStub.get
        .withArgs('/', 'contentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/content/:id', function() {

    it('should route to content.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'contentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/content', function() {

    it('should route to content.controller.create', function() {
      routerStub.post
        .withArgs('/', 'contentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/content/:id', function() {

    it('should route to content.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'contentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/content/:id', function() {

    it('should route to content.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'contentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/content/:id', function() {

    it('should route to content.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'contentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
