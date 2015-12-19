'use strict';

angular.module('culturalystApp')
  .controller('ArtistCtrl', function($firebaseObject, $firebaseArray, $scope, $location, cultFire, $http){
    var artistId = $location.path().split('/').pop();
    // Artist(artistId).then(function(artist){
    //   $scope.artistData = artist;
    //

    $scope.getArtistProfile = function() {
      $http.get('/api/users/artist/' + artistId).then(function(response) {
        $scope.artist = response.data;
        console.log(response.data);
      })
    };

    $scope.posts = $firebaseArray(cultFire.child('posts').child('/' + artistId))

    // console.log($scope.postsy)
    $scope.addPost = function(message) {
      console.log($scope.posts)
      // console.log($scope.postsId)
      $scope.posts.$add({
        name: $scope.artist.name,
        text: message,
        created: Firebase.ServerValue.TIMESTAMP,
        id: artistId
      });
    };


  });
