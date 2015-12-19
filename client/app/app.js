'use strict';

angular.module('culturalystApp', [
  'culturalystApp.auth',
  'culturalystApp.admin',
  'culturalystApp.constants',
  'culturalystApp.uploadArtistContent',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'firebase'
])


  .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
