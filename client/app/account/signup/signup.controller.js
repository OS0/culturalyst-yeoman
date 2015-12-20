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
          //catalyst: this.user.catalyst,
          //creative: this.user.creative,
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          // location: null,
          // birthday: null
        })
        .then(() => {
          context.$log.log(context.user);
          // Account created, redirect to signup details view
          this.$state.go('userInfo');
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
    //this.submitted = true;
    let context = this;

    //   // could I use currentUser()()._id instead of this.Auth.getCurrentUser
    //   this.$http.put('/api/users/' + this.Auth.getCurrentUser()._id +
    // '/updateUserInfo', { name: this.user.name, email: this.user.email,
    // password: this.user.password, location: this.user.location, birthday:
    // this.user.birthday }) .then(() => { // this.$state.go('main'); }); }

    //done() {
    //  this.$state.go('main');
    //}
  }
}

angular.module('culturalystApp')
  .controller('SignupController', SignupController);
