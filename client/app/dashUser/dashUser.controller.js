'use strict';

angular.module('culturalystApp')
  .controller('DashUserCtrl', function ($scope, $log, Auth, $http, $state) {
    $scope.message = 'Hello';
    $http.get('/api/users/me').then(function(res) {
      $scope.me = res.data;
      $log.log($scope.me);
    });
    $state.go('dashUser.myList');
    $scope.mediums = {
      music: false,
      writing: false,
      film: false,
      visualArt: false,
      photography: false,
      dance: false,
      cultureBearers: false,
      comedy: false,
      performingArts: false,
      design: false,
      code: false,
      gaming: false
    };
    $scope.toggleMedium = function(medium) {
      $scope.mediums[medium] = $scope.mediums[medium] === false ? true : false;
    }
  });
