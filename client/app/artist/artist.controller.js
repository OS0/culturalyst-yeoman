'use strict';

angular.module('culturalystApp')
  .controller('ArtistCtrl', function($scope, $location, $http){
    var artistId = $location.path().split('/').pop();

    $http.get('/api/users/' + artistId).then(function(res) {
      console.log(res);
      $scope.artist = res.data;
    })
    
  });


    // $firebaseObject(cultFire.child('Users').child('/' + artistId))
    //   .$loaded()
    //   .then(function(data){
    //   $scope.artist = data
    //   console.log($scope.artist)
    // })

    // $scope.posts = $firebaseArray(cultFire.child('posts').child('/' + artistId))

    // console.log($scope.postsy)
    // $scope.addPost = function(message) {
    //   console.log($scope.posts)
    //   // console.log($scope.postsId)
    //   $scope.posts.$add({
    //     name: $scope.artist.name,
    //     text: message,
    //     created: Firebase.ServerValue.TIMESTAMP,
    //     id: artistId
    //   });
    // };
