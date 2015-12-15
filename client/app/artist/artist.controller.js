'use strict';

angular.module('culturalystApp')
  .controller('ArtistCtrl', function($state, Artist, $scope, $location){
    var artistId = $location.path().split('/').pop();
    Artist(artistId).then(function(artist){
      $scope.artistData = artist;
    })
  });
