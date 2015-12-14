'use strict';

angular.module('culturalystApp')
  .controller('DiscoveryCtrl', function ($scope, $http) {
    $scope.medium = ['Music','Writing','Film'];
    $scope.submedium = {
    	'Music': ['Blues','Violin','Singer','Bluegrass']
    };

    $scope.loadSubMediums = function(medium){
    	if (typeof $scope.submedium[medium] !== 'undefined'){
    		return;
    	}
    	if (medium === 'Writing'){
    		setTimeout(function(){
    			$scope.$apply(function(){
    				$scope.submedium[medium] = ['Poetry','NonFiction','Fiction']; 
    			});
    		},200);
    	}
    };

    // First iteration of get request
    $scope.artists = [];
    $http.get('/api/users/discovery/:medium/:submedium').then(function(response) {
      $scope.artists = response.data;
      console.log($scope.artists)
    })

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
  });
  
