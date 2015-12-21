'use strict';

angular.module('culturalystApp')
  .controller('PaymentCtrl', function ($scope, $http) {
    $scope.get = function(){
      $http.jsonp('https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_7Yac6i1E5MoE5YvDGx9tNYRrBq1tKddQ&scope=read_write').success(function(data){
        console.log('data: ',data)
      })
    }
  });
