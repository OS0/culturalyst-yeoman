'use strict';

angular.module('culturalystApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('artist', {
        url: '/artist/:id',
        templateUrl: 'app/artist/artist.html',
        controller: 'ArtistCtrl'
      })
      .state('artist.bio', {
        templateUrl: 'app/artist/artist.bio.html'
      })
      .state('artist.posts', {
        templateUrl: 'app/artist/artist.posts.html'
      })
      .state('artist.catalysts', {
        templateUrl: 'app/artist/artist.catalysts.html'
      })
  });
