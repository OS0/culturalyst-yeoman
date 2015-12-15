'use strict';

describe('Service: artist', function () {

  // load the service's module
  beforeEach(module('culturalystApp'));

  // instantiate service
  var artist;
  beforeEach(inject(function (_artist_) {
    artist = _artist_;
  }));

  it('should do something', function () {
    expect(!!artist).toBe(true);
  });

});
