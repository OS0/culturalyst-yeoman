'use strict';

angular.module('culturalystApp')
  .controller('ArtistCtrl', ['$state', function($state){
    $state.go('artist.bio')
  }])
