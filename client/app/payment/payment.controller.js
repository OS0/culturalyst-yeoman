'use strict';

angular.module('culturalystApp')
  .controller('PaymentCtrl', function ($scope, $location, stripe, $http, Auth) {
    $scope.artistId = $location.path().split('/').pop();
    $scope.form = {};
    $scope.recurring = false;

    //GET USER INFO
    $http({
      method:'GET',
      url: '/api/users/me'
    }).then(function(data){
      $scope.user = data.data
      console.log($scope.user);
    });

    //GET ARTIST INFO
    $http({
      method: 'GET',
      url: '/api/users/' + $scope.artistId
    }).then(function(data){
      console.log(data)
      $scope.artist = data.data
    });

    $http({
      method: 'POST',
      url: '/api/user_rewards/',
      data: {
        user_id: 1,
        reward_id: 2,
        amount: 3,
        active: true,
      }
    }).then(function(data){
      console.log(data)
      console.log('this fired!')
    });

    $http({
      method: 'GET',
      url: '/api/user_rewards/'
    }).then(function(data){
      console.log(data)
      console.log('this fired!')
    });


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
        name: 'Culturalyst',
        description: 'Catalyze Your Favorite Culture',
        billingAddress: true,
    });

    $scope.submit = function(amount, id){
      $scope.amountToPay = amount;
      $scope.rewardID = id;
      console.log('Amount:', $scope.amountToPay);
      console.log('RewardID:', $scope.rewardID);
      checkout.open({
        amount: amount * 100
      })
      $scope.addReward();
    }
    // Rewards
    $scope.getRewards = function(){
      $http.get('api/rewards/myRewards/' + $scope.artistId).then(function(response){
        console.log('rewards: ',response.data);
        $scope.rewards = response.data;
        console.log($scope.rewards);
      });
    };

    //Send reward to User Rewards Table
    $scope.addReward = function(){
      $http({
        method: 'POST',
        url: 'api/user_rewards/addUserReward/' + $scope.user._id,
        data: {
          user_id: $scope.user._id,
          reward_id: $scope.rewardID,
          amount: $scope.amountToPay
        }
      }).then(function(data){
      console.log('Reward was added to User');
    });
    }

    $scope.getRewards();
    //MOCK REWARD DATA
  });

