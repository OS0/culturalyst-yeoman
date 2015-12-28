'use strict';

describe('Controller: ConnectCtrl', function () {

  // load the controller's module
  beforeEach(module('culturalystApp'));

  var ConnectCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConnectCtrl = $controller('ConnectCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
