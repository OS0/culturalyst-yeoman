'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var submediaCtrlStub = {
  index: 'submediaCtrl.index',
  show: 'submediaCtrl.show',
  create: 'submediaCtrl.create',
  update: 'submediaCtrl.update',
  destroy: 'submediaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var submediaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './submedia.controller': submediaCtrlStub
});

describe('Submedia API Router:', function() {

  it('should return an express router instance', function() {
    submediaIndex.should.equal(routerStub);
  });

  describe('GET /api/submedia', function() {

    it('should route to submedia.controller.index', function() {
      routerStub.get
        .withArgs('/', 'submediaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/submedia/:id', function() {

    it('should route to submedia.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'submediaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/submedia', function() {

    it('should route to submedia.controller.create', function() {
      routerStub.post
        .withArgs('/', 'submediaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/submedia/:id', function() {

    it('should route to submedia.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'submediaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/submedia/:id', function() {

    it('should route to submedia.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'submediaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/submedia/:id', function() {

    it('should route to submedia.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'submediaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
