'use strict';

angular.module('culturalystApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashUser', {
        url: '/dashUser',
        templateUrl: 'app/dashUser/dashUser.html',
        controller: 'DashUserCtrl'
      });
  });
