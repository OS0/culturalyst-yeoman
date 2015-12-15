'use strict';

describe('Service: mediaList', function () {

  // load the service's module
  beforeEach(module('culturalystApp'));

  // instantiate service
  var mediaList;
  beforeEach(inject(function (_mediaList_) {
    mediaList = _mediaList_;
  }));

  it('should do something', function () {
    expect(!!mediaList).toBe(true);
  });

});
