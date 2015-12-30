'use strict';

angular.module('culturalystApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('discovery', {
        url: '/discovery',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl'
      })
      .state('music', {
        url: '/discovery/Music',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
      .state('writing', {
        url: '/discovery/Writing',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
      .state('film', {
        url: '/discovery/Film',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
      .state('visual art', {
        url: '/discovery/Visual',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
      .state('photography', {
        url: '/discovery/Photography',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
      .state('dance', {
        url: '/discovery/Dance',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
      .state('culture bearers', {
        url: '/discovery/Bearers',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
      .state('comedy', {
        url: '/discovery/Comedy',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
      .state('crafts and dyi', {
        url: '/discovery/Crafts',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
      .state('design', {
        url: '/discovery/Design',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
      .state('code', {
        url: '/discovery/Code',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
      .state('sculpture', {
        url: '/discovery/Sculpture',
        templateUrl: 'app/discovery/discovery.html',
        controller: 'DiscoveryCtrl',
      })
  });


