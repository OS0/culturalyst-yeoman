'use strict';

angular.module('culturalystApp')
  .factory('MediaList', function () {
    // Service logic

    var mediaList = [
      {'name': 'Music', 'submedia': ['Hip-hop', 'Guitar', 'Brass', 'Folk', 'Rock','Country']},
      {'name': 'Performing Arts', 'submedia': ['Dance', 'Theater', 'Ballet']}
    ]

    // Public API here
    return {
      getMediaList: function () {
        return mediaList;
      }
    };
  });


