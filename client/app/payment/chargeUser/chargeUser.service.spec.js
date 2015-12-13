'use strict';

describe('Service: chargeUser', function () {

  // load the service's module
  beforeEach(module('culturalystApp'));

  // instantiate service
  var chargeUser;
  beforeEach(inject(function (_chargeUser_) {
    chargeUser = _chargeUser_;
  }));

  it('should do something', function () {
    expect(!!chargeUser).toBe(true);
  });

});
