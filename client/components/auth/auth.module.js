'use strict';

angular.module('culturalystApp.auth', [
  'culturalystApp.constants',
  'culturalystApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
