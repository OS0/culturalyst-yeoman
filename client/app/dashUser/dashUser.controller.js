'use strict';

angular.module('culturalystApp')
  .controller('DashUserCtrl', function ($scope, $log, Auth) {
    $scope.message = 'Hello';
    $log.log(Auth);
    //constructor(Auth) {
    //  this.getCurrentUser = Auth.getCurrentUser;
    //}
    $scope.currentUser = Auth.getCurrentUser.name;
  });
