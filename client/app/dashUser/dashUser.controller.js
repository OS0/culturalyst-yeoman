'use strict';

angular.module('culturalystApp')
  .controller('DashUserCtrl', function ($scope, $log, Auth, $http) {
    $scope.message = 'Hello';
    $log.log(Auth);
    $http.get('/api/users/me').then(function(res) {
      $scope.me = res.data;
      $log.log($scope.me);
    });
  });
