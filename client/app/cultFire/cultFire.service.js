'use strict';

angular.module('culturalystApp')
  .factory('cultFire', function () {
    var ref = new Firebase('https://culturalyst.firebaseio.com/')
    return ref;
  });
