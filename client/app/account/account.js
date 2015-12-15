'use strict';

angular.module('culturalystApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
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
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('signupInfo', {
        url: '/signupInfo',
        templateUrl: 'app/account/signup/signupInfo.html',
        controller: 'SignupController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('artistInfoSignup', {
        url: '/artistInfoSignup',
        templateUrl: 'app/account/artistSignup/artistInfoSignup.html',
        controller: 'ArtistSignupController',
        controllerAs: 'vm'
      })
      .state('artistContentSignup', {
        url: '/artistContentSignup',
        templateUrl: 'app/account/artistSignup/artistContentSignup.html',
        controller: 'ArtistSignupController',
        controllerAs: 'vm'
      })
      .state('artistRewardsSignup', {
        url: '/artistRewardsSignup',
        templateUrl: 'app/account/artistSignup/artistRewardsSignup.html',
        controller: 'ArtistSignupController',
        controllerAs: 'vm'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
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
