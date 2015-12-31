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
      .state('dashUser.rewards', {
        templateUrl: 'app/dashUser/dashUser.rewards.html'
      })
      .state('dashUser.profile', {
        templateUrl: 'app/account/userInfo/userInfo.html',
        controller: 'UserInfoController',
        controllerAs: 'vm'
      })
      .state('dashUser.changePassword', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      })
      .state('dashUser.artistInfo', {
        templateUrl: 'app/account/artistSignup/artistSignupInfo.html',
        controller: 'ArtistSignupController',
        controllerAs: 'vm'
      })
      .state('dashUser.content', {
        templateUrl: 'app/account/artistSignup/artistSignupContent.html',
        controller: 'ArtistSignupController',
        controllerAs: 'vm'
      })
      .state('dashUser.offers', {
        templateUrl: 'app/account/artistSignup/artistSignupRewards.html',
        controller: 'ArtistSignupController',
        controllerAs: 'vm'
      })
      .state('dashUser.connect', {
        templateUrl: 'app/connect/connect.html',
        controller: 'ConnectCtrl',
        controllerAs: 'vm'
      });
  });
