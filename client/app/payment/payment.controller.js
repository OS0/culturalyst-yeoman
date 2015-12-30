'use strict';

angular.module('culturalystApp')
  .controller('PaymentCtrl', ['$scope', '$location', 'angular-stripe', '$http', function ($scope, $location, stripe, $http) {
    var artistId = $location.path().split('/').pop();
    $scope.form = {};
    $scope.recurring = false;



    $scope.submit = function(){

          //create token from their card credntials and send to /charge
      stripe.card.createToken($scope.form).then(function(tok){
        console.log('tok: ',tok)
        $http({
          method: 'POST',
          url: 'api/users/charge',
          data: {
            token: tok.id,
            amount: $scope.amount,
            recurring: $scope.recurring,
            _id: artistId
          }
        })
      })
    }

  }]);
