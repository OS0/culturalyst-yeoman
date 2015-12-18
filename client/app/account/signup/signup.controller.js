'use strict';

class SignupController {
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
  }

  currentUser() {
    //this.$log.info(this.Auth.getCurrentUser());
    return this.Auth.getCurrentUser;
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          location: null,
          birthday: null,
        })
        .then(() => {
          // Account created, redirect to signup details view
          this.$state.go('signupInfo');
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

  // edit this to work on the next page
  userDetail() {
    this.submitted = true;
    //this.state.go('main');

    // could I use currentUser()()._id instead of this.Auth.getCurrentUser
    this.$http.put('/api/users/' + this.Auth.getCurrentUser()._id + '/updateUserInfo', {
        name: this.user.name,
        email: this.user.email,
        location: this.user.location,
        birthday: this.user.birthday
      })
      .then(() => {
        this.$state.go('main');
      });
  }

  userDetailZ() {
    this.$state.go('main');
  }

}

angular.module('culturalystApp')
  .controller('SignupController', SignupController);
