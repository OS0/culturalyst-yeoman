'use strict';

angular.module('culturalystApp')
  .controller('DiscoveryCtrl', function ($scope, $http, MediaList) {

    $scope.mediaList = MediaList.getMediaList();
    $scope.artists = [];

    $scope.loadSubMediums = function(medium){
      console.log(medium.name)
      $scope.selectedMedium = medium.name;
      $scope.submedia = medium.submedia;
    };

    $scope.getArtists = function() {
      $http.get('/api/users/discovery/' + $scope.selectedMedium + '/' + $scope.selectedSubmedium).then(function(response) {
        $scope.artists = response.data;
      })
    }
    

    $scope.featured = [{
        name: 'Sam Bowler',
        medium: 'Sculpture',
        img:'cover_photo_1.png'
      }, {
        name: 'Mykia Smith', 
        medium: 'Writing',
        img:'cover_photo_2.png'
      },{
        name: 'Just Some Dude', 
        medium: 'Musician',
        img:'cover_photo_3.png'
      },{
        name: 'Victor York-Carter', 
        medium: 'Musician',
        img:'cover_photo_4.png'
      },{
        name: 'Just Some Dude', 
        medium: 'Musician',
        img:'cover_photo_5.png'
      }, {
        name: 'Victor York-Carter', 
        medium: 'Musician',
        img:'cover_photo_6.png'
      },{
        name: 'Just Some Dude', 
        medium: 'Musician',
        img:'cover_photo_1.png'
      },{
        name: 'Victor York-Carter', 
        medium: 'Musician',
        img:'cover_photo_2.png'
      },{
        name: 'Just Some Dude', 
        medium: 'Musician',
        img:'cover_photo_3.png'
      }];
  })
  .controller('SearcherCtrl', function ($scope) {
    $scope.currentSel = function() {
      console.log($scope.selectedMedium);
    }
  });
  
