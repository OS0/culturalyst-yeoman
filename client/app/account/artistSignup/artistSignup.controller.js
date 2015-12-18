'use strict';

class ArtistSignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $log, $scope, $http) {
    this.Auth = Auth;
    this.$state = $state;
    this.$log = $log;
    this.$scope = $scope;
    this.$http = $http;
    this.list = [];
  }

  // go to content
  register() {
    this.$state.go('artistSignupContent');
  }

  // go to rewards
  content() {
    this.$state.go('artistSignupRewards');
  }

  //list(){}

  addField() {
    this.$log.log('this was called');
    this.list.push({});
  };

  // go to main
  rewards() {
    this.$state.go('main');
 }

}

angular.module('culturalystApp')
  .controller('ArtistSignupController', ArtistSignupController);
