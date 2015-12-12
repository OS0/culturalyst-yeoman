'use strict';

angular.module('culturalystApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('artist', {
        url: '/artist',
        templateUrl: 'app/artist/artist.html',
        controller: 'ArtistCtrl'
      });
  });
