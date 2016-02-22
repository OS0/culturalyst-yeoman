'use strict';

class UploadController {
  constructor(Auth, Upload, $scope, $rootScope, $location, $http, $log) {
    // Auth
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isArtist = Auth.isArtist;
    // Services
    this.Upload = Upload;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$http = $http;
    this.$log = $log;
    // Variables
    this.date = new Date();
    // Scope name spacing
    this.$scope.title = "Image (" + this.date.getDate() + " - " + this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds() + ")";
  }

  //Static Methods: FIXME: Don't make static
  cloudinaryConfig() {
    return {
      cloud_name: 'culturalyst',
      upload_preset: 'lebxtfjo',
      api_key: '521965896796486'
    };
  };

  dragOverClass($event) {
    var items = $event.dataTransfer.items;
    var hasFile = false;
    if (items != null) {
      for (var i = 0; i < items.length; i++) {
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

  // Getters
  getArtistID() {
    this.$http.get('/api/users/me')
      .then(res => {
        this.$scope.me = res.data;
        this.$scope.artistId = res.data._id;
        getArtistCovers();
      });
  }

  getArtistCovers() {
    this.$http.get('/api/content/' + this.$scope.artistId + '/getAllContent')
      .then(res => {
        this.$log.info('ln:72 Checking res: ', res);
        this.$log.info('ln:73 Checking res.data: ', res.data);
        this.$scope.gallery = this.$scope.gallery || [];
        this.$scope.gallery.push(res.data);
      });
  };

  // Setters
  saveCover(imgType) {
    this.$http.put('/api/content/' + this.$scope.coverId, {type: imgType})
      .then((res)=> {
        //this.$log.info(res);
      });
  };

  saveContent(url) {
    this.$http.post('/api/content/' + this.$scope.artistId, {
        url: url,
        type: 'profile'
      })
      .then((res) => {
        this.$scope.coverId = res.data._id;
        this.$log.info('ln:94 Checking scope.gallery: ', this.$scope.gallery);
        this.$scope.gallery = this.$scope.gallery || [];
        this.$log.info('ln:96 Checking scope.gallery again: ', this.$scope.gallery);
        this.$scope.gallery.push(res.data);
        this.$log.info('ln:98 Checking scope.gallery one more time: ', this.$scope.gallery);
        //this.$log.info(res.data);
      });
  };

  updateImg(imgType, url) {
    this.$http.put('/api/users/' + this.$scope.artistId + '/updateArtistContent', {url: url})
      .then(() => {
        this.$scope.message = "Profile Picture Updated";
        //this.$log.info(this.$scope.message);
      });
  };

  updateCover(imgType, url) {
    this.$http.put('/api/users/' + this.$scope.artistId + '/updateArtistCover', {url: url})
      .then(()=> {
        this.$scope.message = "Cover Photo Updated";
        //this.$log.info(this.$scope.message);
      })
  };

  // Upload file
  uploadFiles(files) {
    this.$scope.files = files;
    if (!this.$scope.files) {
      return;
    }
    let context = this;
    files.forEach((file) => {
      this.$log.info('ln:127 Checking file', file);
      if (file && !file.$error) {
        //console.log($.cloudinary);
        //this.$log.warn("gama", context.cloudinaryConfig);
        file.upload = this.Upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + this.cloudinaryConfig().cloud_name + "/upload",
          fields: {
            upload_preset: this.cloudinaryConfig().upload_preset,
            tags: 'myphotoalbum',
            context: 'photo=' + this.$scope.title
          },
          file: file
        }).progress((e) => {
          this.$log.info('ln:140 Checking event', e);
          file.progress = Math.round((e.loaded * 100.0) / e.total);
          file.status = "Uploading... " + file.progress + "%";
        }).success((data, status, headers, config) => {
          this.$rootScope.photos = this.$rootScope.photos || [];
          data.context = {custom: {photo: this.$scope.title}};
          file.result = data;
          this.$rootScope.photos.push(data);
          //console.log(data);
          this.saveContent(data.secure_url);
        }).error((data, status, headers, config) => {
          file.result = data;
        });
      }
    });
  }
}

angular.module('culturalystApp')
  .controller('UploadController', UploadController);
