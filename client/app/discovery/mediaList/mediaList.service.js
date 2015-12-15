'use strict';

angular.module('culturalystApp')
  .factory('MediaList', function () {
    // Service logic

    var mediaList = [
      {'name': 'Musician', 'submedia': ['Instrumental', 'Rock', 'Country', 'Folk', 'R&B']},
      {'name': 'Writing', 'submedia': ['Poetry', 'Sci-Fi', 'Fantasy', 'Non-Fiction', 'Romance']},
      {'name': 'Film-Makers', 'submedia': ['Documentary', 'Action', 'Romance', 'Fantasy', 'Comedy']},
      {'name': 'Visual-Artist', 'submedia': ['Digital', 'Oil', 'Acrylics', 'Welding','Wood-Work']}
    ]

    // Public API here
    return {
      getMediaList: function () {
        return mediaList;
      }
    };
  });
