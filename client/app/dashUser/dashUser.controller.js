'use strict';

angular.module('culturalystApp')
  .controller('DashUserCtrl', function ($scope, $log, Auth) {
    $scope.message = 'Hello';
    $log.log(Auth);
  });
