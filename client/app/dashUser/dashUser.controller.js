'use strict';

angular.module('culturalystApp')
  .controller('DashUserCtrl', function ($scope, $log, Auth, $http, $state) {
    $scope.me;
    $scope.rewards;
    $http.get('/api/users/me').then(function(res) {
      $scope.me = res.data;
      $scope.showMyRewards();
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
    };

    $scope.showMyRewards = function() {
    $http.get('/api/rewards/' + $scope.me._id + "/showMyRewards")
      .then(function(rewards) {
        $scope.rewards = rewards.data;
      })
    };
  });
