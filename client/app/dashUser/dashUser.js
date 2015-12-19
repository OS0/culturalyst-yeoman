'use strict';

angular.module('culturalystApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashUser', {
        url: '/dashUser',
        templateUrl: 'app/dashUser/dashUser.html',
        controller: 'DashUserCtrl'
      })
      .state('dashUser.rewards', {
        templateUrl: 'app/dashUser/dashUser.rewards.html'
      })
      .state('dashUser.messages', {
        templateUrl: 'app/dashUser/dashUser.messages.html'
      })
      .state('dashUser.mediums', {
        templateUrl: 'app/dashUser/dashUser.mediums.html'
      });
  });
