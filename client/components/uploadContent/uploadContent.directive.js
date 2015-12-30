'use strict';

angular.module('culturalystApp')
  .directive('uploadContent', function () {
    return {
      templateUrl: 'components/uploadContent/uploadContent.html',
      restrict: 'E',
      controller:'UploadCtrl'
    };
  });
