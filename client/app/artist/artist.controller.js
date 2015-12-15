'use strict';

angular.module('culturalystApp')
  .controller('ArtistCtrl', function($state, Artist,$scope, $location){
    $state.go('artist.bio')

    var artistId = $location.path().split('/').pop();

      Artist(artistId).then(function(artist){
        $scope.artistData = artist;
      })
  });
