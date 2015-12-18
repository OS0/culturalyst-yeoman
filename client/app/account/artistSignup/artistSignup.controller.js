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

  currentUser() {
    //this.$log.info(this.Auth.getCurrentUser());
    return this.Auth.getCurrentUser;
  }

  // go to content
  register() {

    // refactor to grab from the html forms
    //this.Auth.updateUserInfo({
    //    name: this.user.name
    //    //what properties do we need to grab from
    //  })
    //  .then(() => {
    //    this.$state.go('artistSignupContent');
    //  });

    this.$state.go('artistSignupContent');

  }

  // go to rewards
  content() {

    // refactor to grab from the html forms
    //this.Auth.updateUserInfo({
    //    name: this.user.name
    //    //what properties do we need to grab from
    //  })
    //  .then(() => {
    //    this.$state.go('artistSignupRewards');
    //  });

    this.$state.go('artistSignupRewards');

  }

  //list(){}

  addField() {
    this.$log.log('this was called');
    this.list.push({});
  };

  // go to main
  rewards() {

    // refactor to grab from the html forms
    //this.Auth.updateUserInfo({
    //    name: this.user.name
    //    //what properties do we need to grab from
    //  })
    //  .then(() => {
    //    this.$state.go('main');
    //  });

    this.$state.go('main');
 }
}

angular.module('culturalystApp')
  .controller('ArtistSignupController', ArtistSignupController);
