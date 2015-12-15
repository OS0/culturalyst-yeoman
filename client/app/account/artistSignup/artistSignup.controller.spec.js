'use strict';

describe('Controller: ArtistSignupCtrl', function () {

  // load the controller's module
  beforeEach(module('culturalystApp'));

  var ArtistSignupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArtistSignupCtrl = $controller('ArtistSignupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
