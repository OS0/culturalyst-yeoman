'use strict';

angular.module('culturalystApp')
  .controller('PaymentCtrl', ['$scope', '$location', 'angular-stripe', '$http', function ($scope, $location, stripe, $http) {
    var artistId = $location.path().split('/').pop();
    $scope.form = {};
    $scope.recurring = false;

    var sendToken = function(token, args){
      $http({
        method: 'POST',
        url: 'api/users/charge',
        data: {
          token: token.id,
          amount: $scope.amount * 100,
          recurring: $scope.recurring,
          _id: artistId
        }
      })
    }
    // Configure Checkout
    var checkout = StripeCheckout.configure({
        key: 'pk_test_fN4bxAyEBsyBxrDWpaOD4sHk',
        token: sendToken,

        image: 'http://theredlist.com/media/database/muses/icon/cinematic_men/1980/bill-murray/002-bill-murray-theredlist.jpg',
        name: 'Culturalyst',
        description: 'Catalyze Your Favorite Artists',
        billingAddress: true,

    });

    $scope.submit = function(){
      checkout.open({
        amount: $scope.amount * 100
      })
    }

  }]);
