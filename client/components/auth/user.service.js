'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  },
  {
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    // },
    // updateUserInfo: {
    // method: 'PUT',
    // params: {
    //   controller:'updateUserInfo'
    // }
  },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    }
  });
}

angular.module('culturalystApp.auth')
  .factory('User', UserResource);

})();
