'use strict';

angular.module('culturalystApp')
  .controller('PaymentCtrl', function ($scope, $location, stripe, $http) {
    $scope.artistId = $location.path().split('/').pop();
    $scope.form = {};
    $scope.recurring = false;

    //GET ARTIST INFO
    $http({
      method: 'GET',
      url: '/api/users/' + $scope.artistId
    }).then(function(data){
      console.log(data)
      $scope.artist = data.data
    })

    $scope.artist = {}
    // Payment
    var sendToken = function(token, args){
      console.log('args: ',args)
      $http({
        method: 'POST',
        url: 'api/users/charge',
        data: {
          token: token.id,
          amount: $scope.amountToPay * 100,
          recurring: $scope.recurring,
          _id: $scope.artistId
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

    $scope.submit = function(amount){
      $scope.amountToPay = amount;
      checkout.open({
        amount: amount * 100
      })
    }
    // Rewards
    $scope.getRewards = function(){
      $http.get('api/rewards/myRewards/' + $scope.artistId).then(function(response){
        console.log('rewards: ',response.data);
        $scope.rewards = response.data;
        console.log($scope.rewards);
      });
    };
    $scope.getRewards();
    //MOCK REWARD DATA
  });
