'use strict';


angular.module('culturalystApp.uploadArtistContent', ['ngFileUpload'])
    .controller('UploadCtrl', ['$scope', '$rootScope','$location', 'Upload', '$http',
  /* Uploading with Angular File Upload */
  function($scope, $rootScope, $location, $upload, $http) {
    var d = new Date();
    $scope.artistId;
    $scope.gallery = [];

    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    //$scope.$watch('files', function() {
    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
            fields: {
              upload_preset: $.cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title
            },
            file: file
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          }).success(function (data, status, headers, config) {
            $rootScope.photos = $rootScope.photos || [];
            data.context = {custom: {photo: $scope.title}};
            file.result = data;
            $rootScope.photos.push(data);
            $scope.saveContent(data.secure_url);
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };
    // });

    $scope.saveContent = function(url){
        $http.post('/api/content/' + $scope.artistId, {url: url, type:'profile'}).then(function(response){
            $scope.gallery.push(response.data);
        })
    };

    $scope.updateImg = function(imgType, url){
        $http.put('/api/users/' + $scope.artistId +'/updateArtistContent', {url: url}).then(function(response){
            console.log(response.status);
        })
    };

    $scope.updateCover = function(imgType, url){
        $http.put('/api/users/' + $scope.artistId +'/updateArtistCover', {url: url}).then(function(response){
            console.log(response.status);
        })
    };

    $scope.getArtistContent = function(){
      console.log('this fired');
      console.log($scope.artistId);
      $http.get('/api/content/' + $scope.artistId +'/getAllContent').then(function(response){
        console.log(response.data);
        response.data.forEach(function(img){
          $scope.gallery.push(img);
        });
        console.log('content: ', response);
      })
    };



     $scope.getArtistID = function(){
        $http.get('/api/users/me').then(function(response) {
        $scope.me = response.data;
        $scope.artistId = response.data._id
        console.log($scope.me);
        console.log($scope.artistId);
        $scope.getArtistContent();
      })
    };



    /* Modify the look and fill of the dropzone when files are being dragged over it */
    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
        for (var i = 0 ; i < items.length; i++) {
          if (items[i].kind == 'file') {
            hasFile = true;
            break;
          }
        }
      } else {
        hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
    };
  }]);





















































//   .controller('UploadCtrl', ['$scope', 'Upload', '$timeout', '$http', '$location', function ($scope, Upload, $timeout, $http, $location) {
//     $scope.$watch('files', function () {
//         $scope.upload($scope.files);
//     });
//     $scope.$watch('file', function () {
//         if ($scope.file != null) {
//             $scope.files = [$scope.file];
//         }
//     });

//     $scope.artistId;

//     $scope.log ='';

//     $scope.getArtistID = function(){
//         $http.get('/api/users/me').then(function(response) {
//         $scope.me = response.data;
//         $scope.artistId = response.data._id
//         console.log($scope.me);
//         console.log($scope.artistId);
//       })
//     };

//     $scope.saveContent = function(imgName){
//         $http.post('/api/content/' + $scope.artistId + '/' + imgName, {name: imgName}).then(function(response){
//             console.log(response.data);
//         })
//     };

//     $scope.test = function(){
//         console.log('this fired');
//     }

//     $scope.upload = function (files) {
//         if (files && files.length) {
//             for (var i = 0; i < files.length; i++) {
//               var file = files[i];
//               if (!file.$error) {
//                 Upload.upload({
//                     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
//                     data: {
//                       username: $scope.username,
//                       file: file
//                     }
//                 }).progress(function (evt) {
//                     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//                     $scope.log = 'progress: ' + progressPercentage + '% ' +
//                                 evt.config.data.file.name + '\n' + $scope.log;
//                 }).success(function (data, status, headers, config) {
//                     console.log('This data: ', data);
//                     var imgName = data.result[0].name;
//                     console.log(imgName);
//                     $scope.saveContent(imgName);
//                     $timeout(function() {
//                         $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
//                     });
//                 });
//               }
//             }
//         }
//     };

// }]);

    // $scope.getArtistProfile = function() {
    //   $http.get('/api/users/artist/' + artistId).then(function(response) {
    //     $scope.artist = response.data;
    //     console.log(response.data);
    //   })
    // };
