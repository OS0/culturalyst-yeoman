'use strict';

angular.module('culturalystApp')
  .factory('MediaList', function () {
    // Service logic

    var mediaList = [
      {'name': 'Animation', 'submedia': ['Claymation', 'Drawn Animation', 'Stop Animation']},
      {'name': 'Comedy'},
      {'name': 'Comics', 'submedia': ['Anime', 'Graphic Novels']},
      {'name': 'Crafts and DIY', 'submedia': ['Crochet', 'Cross Stitch', 'Knitting', 'Lettering Arts']},
      {'name': 'Dance and Theater', 'submedia': ['Ballet', 'Ballroom', 'Hip-hop', 'Lyrical','Theater', 'Plays', 'Musicals']},
      {'name': 'Education'},
      {'name': 'Games'},
      {'name': 'Music', 'submedia': ['Brass', 'Classical', 'Country', 'Experimental', 'Folk', 'Hip-hop', 'Jazz', 'Rock']},
      {'name': 'Painting and Drawing', 'submedia': ['Acrylics', 'Pastels', 'Watercolor', 'Charcoal', 'Pencil']},
      {'name': 'Photography', 'submedia': ['Digital', 'Film']},
      {'name': 'Podcasts'},
      {'name': 'Science'},
      {'name': 'Sculpture', 'submedia': ['Clay', 'Metal', 'Wood']},
      {'name': 'Video and Film', 'submedia': ['Documentaries', 'Feature Films', 'Short Films']},
      {'name': 'Writing', 'submedia': ['Fiction', 'Non-Fiction', 'Poetry']}
    ];

    // Public API here
    return {
      getMediaList: function () {
        return mediaList;
      }
    };
  });


