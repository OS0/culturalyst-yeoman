'use strict';

class SidebarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
    'title':'Discovery',
    'state':'discovery'
  }];

  isCollapsed = true;
  //end-non-standard
  constructor($log) {
      this.$log = $log;
      this.$log.info('sidebar loaded');
  }
  sidebarToggle () {
    $("#menu-toggle").mouseover(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
     $("#menu-toggle-2").mouseover(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled-2");
        $('#menu ul').hide();
    });
  }
   initMenu() {
      $('#menu ul').hide();
      $('#menu ul').children('.current').parent().show();
      //$('#menu ul:first').show();
      $('#menu li a').click(
        function() {
          var checkElement = $(this).next();
          if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            return false;
            }
          if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('#menu ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
            return false;
            }
          }
        );
      }
}

angular.module('culturalystApp')
  .controller('SidebarController', SidebarController);
