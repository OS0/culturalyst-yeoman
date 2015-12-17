'use strict';

angular.module('culturalystApp')
  .controller('ArtistCtrl', function($firebaseObject, $firebaseArray, $scope, $location, cultFire){
    var artistId = $location.path().split('/').pop();
    // Artist(artistId).then(function(artist){
    //   $scope.artistData = artist;
    // })
    $firebaseObject(cultFire.child('Users').child('/' + artistId))
      .$loaded()
      .then(function(data){
      $scope.artist = data
      console.log($scope.artist)
    })

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
