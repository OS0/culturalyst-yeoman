'use strict';

class UserInfoController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $scope, $http) {
    this.Auth = Auth;
    this.$state = $state;
    this.$scope = $scope;
    this.$http = $http;
    this.$scope.currentUser = this.Auth.getCurrentUser();
  }

  userDetail() {
    console.log("Preparing to Update!")
    this.$http.put('/api/users/' + this.Auth.getCurrentUser()._id + '/updateUserInfo', {
        name: this.$scope.currentUser.name,
        email: this.$scope.currentUser.email,
        location: this.$scope.currentUser.location
      })
      .then(() => {
        console.log("I $promise I love you!");
      // this.$state.go('main');
      })
      .catch(err => {
        console.log(err.status, err.data);
      });
  }
}

angular.module('culturalystApp')
  .controller('UserInfoController', UserInfoController);
