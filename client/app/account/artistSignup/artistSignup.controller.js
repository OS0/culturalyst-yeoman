'use strict';

class ArtistSignupController {
  constructor(Auth, $state, $log, $scope, $http) {
    this.Auth = Auth;
    this.$state = $state;
    this.$log = $log;
    this.$scope = $scope;
    this.$http = $http;
  }

}

angular.module('culturalystApp')
  .controller('ArtistSignupController', ArtistSignupController);
