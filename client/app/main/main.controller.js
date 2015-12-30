'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.$scope = $scope;


    $scope.featuredArtists = [{
      _id: 1,
        name: 'Milton Meadow',
        medium: 'Music',
        submedium: 'Folk',
        img:'cover_photo_2.png',
        picUrl: 'ar.png'
      }, {
        _id: 2,
        name: 'Jamtown',
        medium: 'Music',
        submedium: 'Baby Making Music',
        img:'cover_photo_5.png',
        picUrl: 'rascle.png'
      },{
        _id: 3,
        name: 'Lillian Grass',
        medium: 'Music',
        submedium: 'Meow Hop',
        img:'cover_photo_5.png',
        picUrl: 'bk.png'
      },{
        _id: 4,
        name: 'Adelaide Cree',
        medium: 'Art',
        submedium: 'Esoteric',
        img:'cover_photo_1.png',
        picUrl: 'richkoala.jpg'
      },{
        _id: 5,
        name: 'Yosef Watkins',
        medium: 'Art',
        submedium: 'Abstract Dreamscapes',
        img:'cover_photo_3.png',
        picUrl: 'vic.png'
      }, {
        _id: 6,
        name: 'Vivangelo',
        medium: 'Art',
        submedium: 'Lace Work',
        img:'cover_photo_6.png',
        picUrl: 'mykia.png'
    }];


  }
  getFeatured() {
    let context = this;
    console.log('something from rascle');
    this.$http.get('/api/users/show/featured')
    .then(function(featured) {
      console.log(featured);
      // context.$scope.featuredArtists = featured.data;
    });
  }

}


angular.module('culturalystApp')
  .controller('MainController', MainController);

})();
