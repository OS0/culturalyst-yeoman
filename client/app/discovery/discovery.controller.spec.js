'use strict';

describe('Controller: DiscoveryCtrl', function () {

  // load the controller's module
  beforeEach(module('culturalystApp'));

  var DiscoveryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DiscoveryCtrl = $controller('DiscoveryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
