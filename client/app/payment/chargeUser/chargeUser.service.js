'use strict';

angular.module('culturalystApp')
  .factory('chargeUser', function ($http) {
    return function(amount){
      var checkout = StripeCheckout.configure({
        key: 'pk_test_fN4bxAyEBsyBxrDWpaOD4sHk',
        token: function(token){
          $http({
            method: 'POST',
            url: '/charge',
            data: {
              stripeToken: token.id,
              amount: amount * 100
            }
          })
        },
          image: 'http://theredlist.com/media/database/muses/icon/cinematic_men/1980/bill-murray/002-bill-murray-theredlist.jpg',
          name: 'Culturalyst',
          description: 'Broooo',
          amount: amount * 100,
        });
      checkout.open();
    }
  });
