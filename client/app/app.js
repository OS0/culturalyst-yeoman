'use strict';

angular.module('culturalystApp', [
  'culturalystApp.auth',
  'culturalystApp.admin',
  'culturalystApp.constants',
  'ngCookies',
  'ngFileUpload',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'angular-stripe'
])


  .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
