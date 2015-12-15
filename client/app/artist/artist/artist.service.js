'use strict';

angular.module('culturalystApp')
  .factory('Artist', ['$http',function ($http) {
    return function(id){
      $http({
        method: 'GET',
        url: '/artist/' + id
      })
    }
  }]);
