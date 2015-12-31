'use strict';

class ArtistSignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $log, $scope, $http, $timeout, MediaList, $window) {
    this.Auth = Auth;
    this.$state = $state;
    this.$log = $log;
    this.$scope = $scope;
    this.$http = $http;
    this.$scope.currentUser = this.Auth.getCurrentUser();
    this.$timeout = $timeout;
    this.MediaList = MediaList;
    this.$scope.list = [];
    this.$scope.rewards = this.showRewards() || [];
    this.$scope.newReward = {};
    this.$scope.mediaList = this.MediaList.getMediaList();
    this.$window = $window;
    this.isArtist = this.Auth.isArtist;
  }

  //currentUser() {
  //  return this.Auth.getCurrentUser;
  //}

  loadSubMediums(medium) {
    this.$scope.selectedMedium = medium.name;
    this.$scope.submedia = medium.submedia;
  };


  // go to content
  register() {
    let context = this;


  this.$http.put('/api/users/' + this.$scope.currentUser._id + '/updateArtistInfo', {
        short_bio: context.$scope.short_bio,
        vid_bio: context.$scope.vid_bio,
        bio: context.$scope.bio,
        medium: context.$scope.selectedMedium,
        submedium: context.$scope.selectedSubmedium,
        age: context.$scope.age,
        natives: context.$scope.natives,
        org: context.$scope.org,
        experience:context.$scope.experience,
        facebook: context.$scope.faceBookUrl,
        instagram: context.$scope.instagramUrl,
        twitter: context.$scope.twitterUrl,
        etsy: context.$scope.etsyUrl,
        soundcloud: context.$scope.soundCloudUrl,
        behance: context.$scope.behanceUrl
      }).then(function(res) {
      console.log(res);
    });

    //.then(() => {
    //  context.$timeout(this.$state.go('artistSignupContent'), 1000);
    //  //this.$state.go('main');
    //});

    // refactor to grab from the html forms
    //this.Auth.updateUserInfo({
    //    name: this.user.name
    //    //what properties do we need to grab from
    //  })
    //  .then(() => {
    //    this.$state.go('artistSignupContent');
    //  });

    //this.$state.go('artistSignupContent');

  }

  showRewards() {
    let context = this;
    this.Auth.getCurrentUser(function(user) {
      context.$http.get('api/rewards/myRewards/' + user._id)
      .then(function(res) {
        context.$scope.rewards = res.data;
        console.log(context.$scope.rewards);
      })
    })
  }

  // go to main
  saveReward() {
    let context = this;
    console.log(context.$scope.newReward);

    this.$http.post('/api/rewards/newReward/' + context.$scope.currentUser._id, context.$scope.newReward).then(function(res) {
      context.$scope.rewards.push(context.$scope.newReward);
      context.$scope.newReward = {};
    })
    
  }

  deleteReward() {
    console.log("DELETING!")
    // this.$http.delete('/api/rewards/' + id).then(function(res) {
    //   console.log(res);
    // }
  }

  done() {
    this.state.go('main');
  }
}

angular.module('culturalystApp')
  .controller('ArtistSignupController', ArtistSignupController);
