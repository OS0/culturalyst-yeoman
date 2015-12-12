'use strict';

angular.module('culturalystApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashArtist', {
        url: '/dashArtist',
        templateUrl: 'app/dashArtist/dashArtist.html',
        controller: 'DashArtistCtrl'
      });
  });
