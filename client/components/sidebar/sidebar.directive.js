'use strict';

angular.module('culturalystApp')
  .directive('sidebar', () => ({
      templateUrl: 'components/sidebar/sidebar.html',
      restrict: 'EA',
      controller: 'SidebarController',
      controllerAs: 'sidebar'
}));
