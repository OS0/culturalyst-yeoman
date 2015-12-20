'use strict';

angular.module('culturalystApp')
  .config(function($stateProvider) {
    $stateProvider
      // login
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      // logout
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer ||
            $state.current.referrer ||
            'main';
          Auth.logout();
          $state.go(referrer);
        }
      })
      // signup general phase 1: basic information
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      // signup general phase 2: detailed information
      .state('signupInfo', {
        url: '/signupInfo',
        templateUrl: 'app/account/signup/signupInfo.html',
        controller: 'SignupController',
        controllerAs: 'vm',
        authenticate: true
      })
      // signup artist phase 1: basic information
      .state('artistSignupInfo', {
        url: '/artistSignupInfo',
        templateUrl: 'app/account/artistSignup/artistSignupInfo.html',
        controller: 'ArtistSignupController',
        controllerAs: 'vm',
        authenticate: true
      })
      // signup artist phase 2: upload content; a profile image and a banner
      // image
      .state('artistSignupContent', {
        url: '/artistSignupContent',
        templateUrl: 'app/account/artistSignup/artistSignupContent.html',
        controller: 'ArtistSignupController',
        controllerAs: 'vm',
        authenticate: true
      })
      // signup artist phase 3: set up rewards
      .state('artistSignupRewards', {
        url: '/artistSignupRewards',
        templateUrl: 'app/account/artistSignup/artistSignupRewards.html',
        controller: 'ArtistSignupController',
        controllerAs: 'vm',
        authenticate: true
      })
      // settings page for passwords
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('userInfo', {
        url: '/userInfo',
        templateUrl: 'app/account/userInfo/userInfo.html',
        controller: 'UserInfoController',
        controllerAs: 'vm',
        authenticate: true
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
