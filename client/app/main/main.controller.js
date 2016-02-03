'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.$scope = $scope;

    $scope.featuredArtists = [{
      _id: 1,
        name: 'Milton Meadow',
        medium: 'Culture Bearer',
        submedium: 'Wild Magnolias',
        img:'cover_photo_2.png',
        picUrl: 'ar.png'
      }, {
        _id: 2,
        name: 'Jason Rida',
        medium: 'Music',
        submedium: 'Brass',
        img:'cover_photo_5.png',
        picUrl: 'vic.png'
      },{
        _id: 3,
        name: 'Lillian Grass',
        medium: 'Dance',
        submedium: 'Hip-hop',
        img:'cover_photo_5.png',
        picUrl: 'bk.png'
      },{
        _id: 4,
        name: 'Adelaide Cree',
        medium: 'Art',
        submedium: 'Esoteric',
        img:'cover_photo_6.png',
        picUrl: 'richkoala.jpg'
      },{
        _id: 5,
        name: 'Yosef Watkins',
        medium: 'Art',
        submedium: 'Abstract Dreamscapes',
        img:'cover_photo_3.png',
        picUrl: 'rascle.png'
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
    //this.$http.get('/api/users/featured')
    //.then(function(featured) {
    //  console.log(featured);
    //  context.$scope.featuredArtists = featured.data;
    //});
  }

}


angular.module('culturalystApp')
  .controller('MainController', MainController);

})();
