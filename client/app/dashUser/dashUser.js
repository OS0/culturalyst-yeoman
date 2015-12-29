'use strict';

angular.module('culturalystApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashUser', {
        url: '/dashUser',
        templateUrl: 'app/dashUser/dashUser.html',
        controller: 'DashUserCtrl',
        controllerAs: 'dash'
      })
      .state('dashUser.myList', {
        templateUrl: 'app/dashUser/dashUser.myList.html'
      })
      .state('dashUser.rewards', {
        templateUrl: 'app/dashUser/dashUser.rewards.html'
      })
      .state('dashUser.messages', {
        templateUrl: 'app/dashUser/dashUser.messages.html'
      })
      .state('dashUser.mediums', {
        templateUrl: 'app/dashUser/dashUser.mediums.html'
      })
      .state('dashUser.profile', {
        templateUrl: 'app/dashUser/dashUser.profile.html'
      })
      .state('dashUser.changePassword', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm2'
      });
  });
