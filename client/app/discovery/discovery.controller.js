'use strict';

angular.module('culturalystApp')
.controller('DiscoveryCtrl', function($scope, MediaList, $http, $location){
  $scope.mediaList = MediaList.getMediaList();

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
      $scope.selectedMedium = medium.name;
      $scope.submedia = medium.submedia;
    };

    //Note: populatePage = fn for when user clicks on medium button
    //TODO: Have value of dropdown become pageMedium
    $scope.populatePage = function() {
      $scope.pageMedium = $location.path().split('/').pop();
      $http.get('/api/users/discovery/' + $scope.pageMedium + '/undefined' ).then(function(response) {
        // $('#mediaID').val('Music').change();
        $scope.artists = response.data;
      })
    }
    $scope.populatePage()
});
