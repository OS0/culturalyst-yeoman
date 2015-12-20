'use strict';

describe('Controller: UserInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('culturalystApp'));

  var UserInfoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserInfoCtrl = $controller('UserInfoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
