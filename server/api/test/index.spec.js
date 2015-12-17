'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var testCtrlStub = {
  index: 'testCtrl.index',
  show: 'testCtrl.show',
  create: 'testCtrl.create',
  update: 'testCtrl.update',
  destroy: 'testCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var testIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './test.controller': testCtrlStub
});

describe('Test API Router:', function() {

  it('should return an express router instance', function() {
    testIndex.should.equal(routerStub);
  });

  describe('GET /api/tests', function() {

    it('should route to test.controller.index', function() {
      routerStub.get
        .withArgs('/', 'testCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tests/:id', function() {

    it('should route to test.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'testCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tests', function() {

    it('should route to test.controller.create', function() {
      routerStub.post
        .withArgs('/', 'testCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tests/:id', function() {

    it('should route to test.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'testCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tests/:id', function() {

    it('should route to test.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'testCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tests/:id', function() {

    it('should route to test.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'testCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
