'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $log, $scope) {
    this.Auth = Auth;
    this.$state = $state;
    this.$log = $log;
    this.$scope = $scope;
  }

  currentUser() {
    this.$log.info(this.Auth.getCurrentUser());
    return this.Auth.getCurrentUser;
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
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
  userDetail(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Account updated, redirect to home
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
}

angular.module('culturalystApp')
  .controller('SignupController', SignupController);

/*
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

 this.$log.info(this.Auth.getCurrentUser()._id);

 this.$scope.user = this.Auth.getCurrentUser();

 this.$log.info(this.$scope.name);
 }

 register(form) {
 this.submitted = true;

 if (form.$valid) {
 this.Auth.createUser({
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

 completeSignup(form) {
 //submit will save the form to the database and update push the user to
 // the discovery page
 //this.$state.go('discovery');
 }
 }

 angular.module('culturalystApp')
 .controller('SignupController', SignupController);
 */
