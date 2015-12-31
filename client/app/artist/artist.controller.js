'use strict';

angular.module('culturalystApp')
  .controller('ArtistCtrl', ['$scope', '$rootScope','$location', 'Upload', '$http', 'Auth', '$sce',
    function($scope, $rootScope, $location, $upload, $http, Auth, $sce) {

    $scope.artistId = $location.path().split('/').pop();
    $scope.posts = [];
    $scope.postId;
    $scope.photo = false;
    $scope.rewards;
    $scope.slides;
    $scope.user = Auth.getCurrentUser()._id;
    console.info($scope.user);
    console.log($scope.artistId);
    $scope.delta;
    $scope.artist;
    $scope.videoID;

    $scope.checkIfArtist = function(){
      if ($scope.user === $scope.artistId){
        delta = visible;
        console.log(true)
      } else{
        delta = hidden;
      }
    };

    $http.get('/api/users/' + $scope.artistId).then(function(res) {
      console.log(res);
      $scope.artist = res.data;
      console.log($scope.artist);
      $scope.getRewards();
    });


    $http.get('/api/content/' + $scope.artistId).then(function(res) {
      console.log(res);
      $scope.content = res.data;
    });


    // $scope.init = function(){
    //   window.addEventListener('scroll', function(e){
    //     console.log('this fired');
    //     var distanceY = window.pageYOffset || document.documentElement.scrollTop, 
    //     shrinkOn = 5, 
    //     var $header = $('.artistNav');
    //     console.log(distanceY);
    //     if (distanceY > shrinkOn) {
    //         $header.removeClass("artistNav");
    //         $header.addClass("smaller");
    //     } else {
    //         $header.removeClass("smaller");
    //     }
    //   });
    // }

 

     $scope.saveContent = function(post){
      console.log($scope.postId);
      if ($scope.photo){
        $http.put('/api/content/' + $scope.postId, {_id: $scope.postId, info: post}).then(function(response){
            console.log(response.data);
            $scope.posts.push(response.data);
            $scope.photo = false;
        })
      } else {
        $scope.photo 
        $http.post('/api/content/' + $scope.artistId, {info: post, type: "post"}).then(function(response){
            console.log(response.data);
            $scope.posts.push(response.data);
        })
      }
    };

    $scope.saveContentPhoto = function(url){
      console.log('this was fired');
        $http.post('/api/content/' + $scope.artistId, {_id: $scope.postId, url: url, type:"post"}).then(function(response){
            console.log(response.data);
            $scope.postId = response.data._id;
        })
    };

    $scope.getArtistContent = function(){
      console.log($scope.artistId);
      $http.get('/api/content/' + $scope.artistId +'/getContent').then(function(response){
        console.log(response.data);
        response.data.forEach(function(info){
          $scope.posts.push(info);
        });
        console.log('content: ', response);
      })
    };

    $scope.getArtistCovers = function(){
      $http.get('/api/content/' + $scope.artistId +'/getCovers').then(function(response){
        console.log('covers', response.data);
        $scope.slides = response.data;
      })
    };

    $scope.getRewards = function(){
      $http.get('api/rewards/myRewards/' + $scope.artistId).then(function(response){
        console.log(response.data);
        $scope.rewards = response.data;
        console.log($scope.rewards);
      });
    };

    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
      console.log('files', $scope.files);
      // angular.forEach(files, function(file){
      //   if (file && !file.$error) {
      //     file.upload = $upload.upload({
      //       url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
      //       fields: {
      //         upload_preset: $.cloudinary.config().upload_preset,
      //         tags: 'myphotoalbum',
      //         context: 'photo=' + $scope.title
      //       },
      //       file: file
      //     }).progress(function (e) {
      //       file.progress = Math.round((e.loaded * 100.0) / e.total);
      //       file.status = "Uploading... " + file.progress + "%";
      //     }).success(function (data, status, headers, config) {
      //       $rootScope.photos = $rootScope.photos || [];
      //       data.context = {custom: {photo: $scope.title}};
      //       file.result = data;
      //       $rootScope.photos.push(data);
      //       $scope.photo = true;
      //       $scope.saveContentPhoto(data.secure_url);
      //       console.log($scope.photo);
      //     }).error(function (data, status, headers, config) {
      //       file.result = data;
      //     });
      //   }
      // });
    };

    // carasole
      $scope.myInterval = 5000;
      $scope.noWrapSlides = false;
      // $scope.addSlide = function() {
      //    //may not need this
      //   var newWidth = 1200 + slides.length + 1;
      //   //var w = window.innerWidth;
      //   slides.push({
      //     contentImg: $http.get('/api/content/' + $scope.artistId),
      //     image: '//placekitten.com/' + newWidth + '/300'
      //   });
      // };
      // for (var i = 0; i < 4; i++) {
      //   $scope.addSlide();
      // }


  }]);
