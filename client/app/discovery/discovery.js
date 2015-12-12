'use strict';

angular.module('culturalystApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('discovery', {
        url: '/discovery',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl'
      });
  });
