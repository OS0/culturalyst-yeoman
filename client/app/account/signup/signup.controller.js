'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $log, $scope, $http, $timeout) {
    this.Auth = Auth;
    this.$state = $state;
    this.$log = $log;
    this.$scope = $scope;
    this.$http = $http;
    this.$timeout = $timeout;
    this.isArtist = this.Auth.isArist;
  }

  currentUser() {
    //this.$log.info(this.Auth.getCurrentUser());
    return this.Auth.getCurrentUser;
  }


  register(form) {
    this.submitted = true;
    let context = this;

    if (form.$valid) {
      this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        })
        .then(() => {
          context.$log.log(context.user);
          // Account created, redirect to signup details view
          this.$state.go('dashUser.profile');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the sequelize errors
          if (err.name) {
            angular.forEach(err.fields, field => {
              form[field].$setValidity('mongoose', false);
              this.errors[field] = err.message;
            });
          }
        });
    }
  }
}



angular.module('culturalystApp')
  .controller('SignupController', SignupController);
