'use strict';

angular.module('culturalystApp.uploadArtistContent')
  .directive('uploadContent', function () {
    return {
      templateUrl: 'components/uploadContent/uploadContent.html',
      restrict: 'E',
      controller:'UploadCtrl'
    };
  });
