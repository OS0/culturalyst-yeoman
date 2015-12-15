'use strict';

angular.module('culturalystApp')
  .controller('PaymentCtrl', function ($scope, chargeUser) {
    $scope.amount;
    $scope.charge = function(){
      chargeUser($scope.amount);
    };
  });
