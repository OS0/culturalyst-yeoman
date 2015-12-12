'use strict';

describe('Controller: DashUserCtrl', function () {

  // load the controller's module
  beforeEach(module('culturalystApp'));

  var DashUserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashUserCtrl = $controller('DashUserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
