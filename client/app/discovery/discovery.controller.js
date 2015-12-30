'use strict';

angular.module('culturalystApp')
.controller('DiscoveryCtrl', function($scope, MediaList, $http, $location){
  $scope.mediaList = MediaList.getMediaList();
  console.log('hi')
  console.log($scope.artists)

    $scope.ageList = [
      {"age": "age-18"},
      {"age": "age18-24"},
      {"age": "age25-44"},
      {"age": "age45-64"},
      {"age": "age65+"}
    ];

    $scope.orgList = [
      {"org": "true"},
      {"org": "false"}
    ];

    $scope.nativeList = [
      {"natives": "true"},
      {"natives": "false"}
    ];
    $scope.genderList = [
      {"gender": "Female"},
      {"gender": "Male"},
      {"gender": "Transgender"},
      {"gender": "Other"}
    ];

    $scope.expList = [
      {"experience": "Beginner"},
      {"experience": "Intermediate"},
      {"experience": "Professional"},
      {"experience": "Hobbyist"}
    ];

    $scope.getArtists = function() {
      $http.get('/api/users/discovery/' + $scope.selectedMedium + '/' + $scope.selectedSubmedium).then(function(response) {
        $scope.artists = response.data;
        console.log(response.data);
      })
    }

    $scope.loadSubMediums = function(medium){
      console.log(medium.name)
      $scope.selectedMedium = medium.name;
      $scope.submedia = medium.submedia;
    };

    $scope.populatePage = function() {
      $scope.pageMedium = $location.path().split('/').pop();
      $http.get('/api/users/discovery/' + $scope.pageMedium + '/undefined' ).then(function(response) {
        $scope.artists = response.data;
        console.log($scope.pageMedium, 'populatePage');
      })
    }
    $scope.populatePage()
});
