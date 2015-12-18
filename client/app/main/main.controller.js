'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    $scope.featured = [{
        name: 'Sam Bowler',
        medium: 'Sculpture',
        img:'cover_photo_2.png'
      }, {
        name: 'Mykia Smith',
        medium: 'Writing',
        img:'cover_photo_5.png'
      },{
        name: 'Victor York-Carter',
        medium: 'Resident Weirdo',
        img:'cover_photo_3.png'
      },{
        name: 'Alon Robinson',
        medium: 'Forced Retired Rapper',
        img:'cover_photo_2.png'
      },{
        name: 'Alice Green',
        medium: 'Pep Talk Queen',
        img:'cover_photo_5.png'
      }, {
        name: 'Ryan Bascle',
        medium: 'Sexy Dancer',
        img:'cover_photo_6.png'
    }];


  }


}


angular.module('culturalystApp')
  .controller('MainController', MainController);

})();
