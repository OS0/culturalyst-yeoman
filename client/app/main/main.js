'use strict';

angular.module('culturalystApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mc'
      })
      .state('.mediums',{
        parent:'main',
      	templateUrl:'app/main/main.mediums.html'
      })
      .state('.mymediums',{
        parent:'main',
      	templateUrl:'app/main/main.mymediums.html'
      })
  });
