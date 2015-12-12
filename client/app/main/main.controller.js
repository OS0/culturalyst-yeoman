'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    $scope.featured = [{
        name: 'Sam Bowler',
        medium: 'Sculpture',
        img:'cover_photo_1.png'
      }, {
        name: 'Mykia Smith', 
        medium: 'Writing',
        img:'cover_photo_2.png'
      },{
        name: 'Victor York-Carter', 
        medium: 'Sex Robots',
        img:'cover_photo_3.png'
      },{
        name: 'Victor York-Carter', 
        medium: 'Sex Robots',
        img:'cover_photo_4.png'
      },{
        name: 'Victor York-Carter', 
        medium: 'Sex Robots',
        img:'cover_photo_5.png'
      }, {
        name: 'Victor York-Carter', 
        medium: 'Sex Robots',
        img:'cover_photo_6.png'
      }];
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('culturalystApp')
  .controller('MainController', MainController);

})();
