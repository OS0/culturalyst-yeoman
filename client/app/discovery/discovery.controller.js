'use strict';

angular.module('culturalystApp')
<<<<<<< HEAD
.controller('DiscoveryCtrl', function($scope, cultFire, $firebaseArray, MediaList, $http){
  $scope.mediaList = MediaList.getMediaList();
  console.log('hi')
  //$scope.artists = $firebaseArray(cultFire.child('Users'));
  console.log($scope.artists)
=======
.controller('DiscoveryCtrl', function($scope, cultFire, $firebaseArray, $firebaseObject, MediaList){
  $scope.mediaList = $firebaseArray(cultFire.child('mediums'));
  console.log($scope.mediaList)
  $scope.artists = $firebaseArray(cultFire.child('Users'));
  $scope.getArtists = function(medium) {
    $firebaseArray(cultFire.child('mediums').child(medium.$id)).forEach(function(obj){
      $scope.artists.$add($firebaseObject(cultFire.child('Users').child(obj.$id)))
    })

  }
>>>>>>> feat/stripe-connect beginning functionality of stripe connect


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

  // .controller('DiscoveryCtrl', function ($scope, $http, MediaList) {

  //   $scope.mediaList = MediaList.getMediaList();
  //   $scope.artists = [];
<<<<<<< HEAD


    

  //   $scope.featured = [{
  //       name: 'Sam Bowler',
  //       medium: 'Sculpture',
  //       img:'cover_photo_1.png'
  //     }, {
  //       name: 'Mykia Smith', 
  //       medium: 'Writing',
  //       img:'cover_photo_2.png'
  //     },{
  //       name: 'Alice Green', 
  //       medium: 'Musician',
  //       img:'cover_photo_3.png'
  //     },{
  //       name: 'Alon Robinson', 
  //       medium: 'Musician',
  //       img:'cover_photo_5.png'
  //     },{
  //       name: 'Ryan Bascle', 
  //       medium: 'Musician',
  //       img:'cover_photo_5.png'
  //     }, {
  //       name: 'Brian Kustra', 
  //       medium: 'Musician',
  //       img:'cover_photo_3.png'
  //     },{
  //       name: 'John Fraboni', 
  //       medium: 'Musician',
  //       img:'cover_photo_1.png'
  //     },{
  //       name: 'Max Gaudin', 
  //       medium: 'Musician',
  //       img:'cover_photo_2.png'
  //     },{
  //       name: 'Raisin Canes', 
  //       medium: 'Musician',
  //       img:'cover_photo_3.png'
  //     }];
  // })
  // .controller('SearcherCtrl', function ($scope) {
  //   $scope.currentSel = function() {
  //     console.log($scope.selectedMedium);

  //   }
  // });
  
=======
  //
  //   $scope.loadSubMediums = function(medium){
  //     console.log(medium.name)
  //     $scope.selectedMedium = medium.name;
  //     $scope.submedia = medium.submedia;
  //   };
  //
  //   $scope.getArtists = function() {
  //     $http.get('/api/users/discovery/' + $scope.selectedMedium + '/' + $scope.selectedSubmedium).then(function(response) {
  //       $scope.artists = response.data;
  //     })
  //   }
  //
  //
    // $scope.featured = [{
    //     name: 'Sam Bowler',
    //     medium: 'Sculpture',
    //     img:'cover_photo_1.png'
    //   }, {
    //     name: 'Mykia Smith',
    //     medium: 'Writing',
    //     img:'cover_photo_2.png'
    //   },{
    //     name: 'Just Some Dude',
    //     medium: 'Musician',
    //     img:'cover_photo_3.png'
    //   },{
    //     name: 'Victor York-Carter',
    //     medium: 'Musician',
    //     img:'cover_photo_4.png'
    //   },{
    //     name: 'Just Some Dude',
    //     medium: 'Musician',
    //     img:'cover_photo_5.png'
    //   }, {
    //     name: 'Victor York-Carter',
    //     medium: 'Musician',
    //     img:'cover_photo_6.png'
    //   },{
    //     name: 'Just Some Dude',
    //     medium: 'Musician',
    //     img:'cover_photo_1.png'
    //   },{
    //     name: 'Victor York-Carter',
    //     medium: 'Musician',
    //     img:'cover_photo_2.png'
    //   },{
    //     name: 'Just Some Dude',
    //     medium: 'Musician',
    //     img:'cover_photo_3.png'
    //   }];
  // })
>>>>>>> feat/stripe-connect beginning functionality of stripe connect
