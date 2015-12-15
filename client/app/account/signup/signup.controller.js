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

    this.$log.info(this.Auth.getCurrentUser()._id);

    this.$scope.user = this.Auth.getCurrentUser();

    this.$log.info(this.$scope.name);
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          location: null,
          birthday: null
        })
        .then(() => {
          // Account created, redirect to signup details view
          profileImage: null,
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          location: null
        })
        .then(() => {
          // Account created, redirect to signupInfo for detailed signup page
          // view
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

    this.Auth.updateUserInfo({
        name: this.user.name,
        location: this.user.location,
        birthday: this.user.birthday
      })
      .then(() => {
        this.$state.go('main');
      });

    
  }

  userDetailZ(){
    this.$state.go('main');
  }

}

angular.module('culturalystApp')
  .controller('SignupController', SignupController);
