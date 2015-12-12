'use strict';

describe('Controller: DashArtistCtrl', function () {

  // load the controller's module
  beforeEach(module('culturalystApp'));

  var DashArtistCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashArtistCtrl = $controller('DashArtistCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
