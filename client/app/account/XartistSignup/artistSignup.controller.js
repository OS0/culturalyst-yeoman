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
  }

  info(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
          profileImage: null,
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Account created, redirect to signupInfo for detailed signup page
          // view
          this.$state.go('artistContentRewards');
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

  content(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
          profileImage: null,
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Account created, redirect to signupInfo for detailed signup page
          // view
          this.$state.go('artistSignupRewards');
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

  rewards(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
          profileImage: null,
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Account created, redirect to signupInfo for detailed signup page
          // view
          this.$state.go('discovery');
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

  completeSignup(form) {
    // submit will save the form to the database and update push the user to
    // the discovery page
    //this.$state.go('discovery');
  }
}

angular.module('culturalystApp')
  .controller('ArtistSignupController', ArtistSignupController);
