'use strict';

class ArtistSignupController {
  constructor(Auth, $state, $log, $scope, $http) {
    this.Auth = Auth;
    this.$state = $state;
    this.$log = $log;
    this.$scope = $scope;
    this.$http = $http;
  }

  //// go to content
  //register(InfoForm) {
  //  this.state.go('artistSignupContent');
  //}
  //
  //// go to rewards
  //content(ContentUpload) {
  //  this.state.go('artistSignupRewards');
  //}
  //
  //// go to main
  //rewards(RewardsForm) {
  //  this.state.go('main');
  //}
}

angular.module('culturalystApp')
  .controller('ArtistSignupController', ArtistSignupController);
