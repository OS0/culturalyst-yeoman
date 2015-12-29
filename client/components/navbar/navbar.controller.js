'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
    'title':'Discovery',
    'state':'discovery'
  }
  ];

  isCollapsed = true;
  //end-non-standard


  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isArtist = Auth.isArtist;
  }

  isNotArtist() {
    if ( this.isLoggedIn() && !(this.isArtist()) ) {
      return true;
    }
  }

}

angular.module('culturalystApp')
  .controller('NavbarController', NavbarController);
