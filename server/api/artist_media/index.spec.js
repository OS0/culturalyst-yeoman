'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var artistMediaCtrlStub = {
  index: 'artistMediaCtrl.index',
  show: 'artistMediaCtrl.show',
  create: 'artistMediaCtrl.create',
  update: 'artistMediaCtrl.update',
  destroy: 'artistMediaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var artistMediaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './artist_media.controller': artistMediaCtrlStub
});

describe('ArtistMedia API Router:', function() {

  it('should return an express router instance', function() {
    artistMediaIndex.should.equal(routerStub);
  });

  describe('GET /api/artist_media', function() {

    it('should route to artistMedia.controller.index', function() {
      routerStub.get
        .withArgs('/', 'artistMediaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/artist_media/:id', function() {

    it('should route to artistMedia.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'artistMediaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/artist_media', function() {

    it('should route to artistMedia.controller.create', function() {
      routerStub.post
        .withArgs('/', 'artistMediaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/artist_media/:id', function() {

    it('should route to artistMedia.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'artistMediaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/artist_media/:id', function() {

    it('should route to artistMedia.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'artistMediaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/artist_media/:id', function() {

    it('should route to artistMedia.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'artistMediaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
