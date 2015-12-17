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
<<<<<<< 7409b19465e62361ae6249907dc6eafab06a414a
  ];
=======
];
>>>>>>> Add culturalyst to footer

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('culturalystApp')
  .controller('NavbarController', NavbarController);
