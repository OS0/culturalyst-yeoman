'use strict';

angular.module('culturalystApp')
  .factory('MediaList', function () {
    // Service logic

    var mediaList = [
      {'name': 'Music', 'submedia': ['Brass', 'Classical', 'Country', 'Experimental', 'Folk', 'Hip-hop', 'Jazz', 'Rock']},
      {'name': 'Writing', 'submedia': ['Fiction', 'Non-Fiction', 'Poetry']},
      {'name': 'Film', 'submedia': ['Documentaries', 'Feature Films', 'Short Films']},
      {'name': 'Visual', 'submedia': ['Acrylics', 'Pastels', 'Watercolor', 'Charcoal', 'Pencil']},
      {'name': 'Photography', 'submedia': ['Digital', 'Film']},
      {'name': 'Dance', 'submedia': ['Ballet', 'Ballroom', 'Hip-hop', 'Lyrical','Theater', 'Plays', 'Musicals']},
      {'name': 'Bearers', 'submedia': ['Mardi Gras Indians']},
      {'name': 'Comedy', 'submedia': ['Dark', 'Upbeat']},
      {'name': 'Crafts', 'submedia': ['Crochet', 'Cross Stitch', 'Knitting', 'Lettering Arts']},
      {'name': 'Design'},
      {'name': 'Code', 'submedia': ['Front-end', 'Back-end', 'Full-stack']},
      {'name': 'Sculpture', 'submedia': ['Clay', 'Metal', 'Wood']},
    ]
    // Expanded mediaList arranged alphabetically
    // var mediaList = [
    //   {'name': 'Animation', 'submedia': ['Claymation', 'Drawn Animation', 'Stop Animation']},
    //   {'name': 'Comedy'},
    //   {'name': 'Comics', 'submedia': ['Anime', 'Graphic Novels']},
    //   {'name': 'Crafts and DIY', 'submedia': ['Crochet', 'Cross Stitch', 'Knitting', 'Lettering Arts']},
    //   {'name': 'Culture Bearers', 'submedia': ['Mardi Gras Indians', 'Social Aid and Pleasure Clubs']},
    //   {'name': 'Dance and Theater', 'submedia': ['Ballet', 'Ballroom', 'Hip-hop', 'Lyrical','Theater', 'Plays', 'Musicals']},
    //   {'name': 'Education'},
    //   {'name': 'Games'},
    //   {'name': 'Music', 'submedia': ['Brass', 'Classical', 'Country', 'Experimental', 'Folk', 'Hip-hop', 'Jazz', 'Rock']},
    //   {'name': 'Painting and Drawing', 'submedia': ['Acrylics', 'Pastels', 'Watercolor', 'Charcoal', 'Pencil']},
    //   {'name': 'Photography', 'submedia': ['Digital', 'Film']},
    //   {'name': 'Podcasts'},
    //   {'name': 'Science'},
    //   {'name': 'Sculpture', 'submedia': ['Clay', 'Metal', 'Wood']},
    //   {'name': 'Video and Film', 'submedia': ['Documentaries', 'Feature Films', 'Short Films']},
    //   {'name': 'Writing', 'submedia': ['Fiction', 'Non-Fiction', 'Poetry']}
    // ];

    // Public API here
    return {
      getMediaList: function () {
        return mediaList;
      }
    };
  });


