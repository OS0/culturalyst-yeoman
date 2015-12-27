'use strict';

angular.module('culturalystApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashArtist', {
        url: '/dashArtist',
        templateUrl: 'app/dashArtist/dashArtist.html',
        controller: 'DashArtistCtrl'
      })
      .state('dashArtist.myList', {
        templateUrl: 'app/dashArtist/dashArtist.myList.html'
      })
      .state('dashArtist.rewards', {
        templateUrl: 'app/dashArtist/dashArtist.rewards.html'
      })
      .state('dashArtist.messages', {
        templateUrl: 'app/dashArtist/dashArtist.messages.html'
      })
      .state('dashArtist.payments', {
        templateUrl: 'app/dashArtist/dashArtist.payments.html'
      })
      .state('dashArtist.profile', {
        templateUrl: 'app/dashArtist/dashArtist.profile.html'
      });;
  });
