'use strict';

angular.module('culturalystApp')

.controller('DiscoveryCtrl', function($scope, cultFire, $firebaseArray, $firebaseObject, MediaList){
  $scope.mediaList = $firebaseArray(cultFire.child('mediums'));
  console.log($scope.mediaList)
  $scope.artists = $firebaseArray(cultFire.child('Users'));
  $scope.getArtists = function(medium) {
    $firebaseArray(cultFire.child('mediums').child(medium.$id)).forEach(function(obj){
      $scope.artists.$add($firebaseObject(cultFire.child('Users').child(obj.$id)))
    })

  }

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

});
