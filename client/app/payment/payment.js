'use strict';

angular.module('culturalystApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('payment', {
        url: '/payment/:id',
        templateUrl: 'app/payment/payment.html',
        controller: 'PaymentCtrl'
      });
  });
