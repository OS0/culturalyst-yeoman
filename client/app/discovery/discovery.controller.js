'use strict';

angular.module('culturalystApp')
  .controller('DiscoveryCtrl', function ($scope) {
    $scope.message = 'Hello';
    $scope.medium = ['Music','Writing','Film'];
    $scope.submedium = {
    	'Music': ['Blues','Violin','Singer','Bluegrass']
    };

    $scope.loadSubMediums = function(medium){
    	if (typeof $scope.submedium[medium] !== 'undefined'){
    		return;
    	}
    	if (medium === 'Writing'){
    		setTimeout(function(){
    			$scope.$apply(function(){
    				$scope.submedium[medium] = ['Poetry','NonFiction','Fiction']; 
    			});
    		},200);
    	}
    };
  });
  
