var App = (function () {

  var config = {//Basic Config
    animate: false,
    popover: true,
    assetsPath: 'assets',
    imgPath: 'img',
    jsPath: 'js',
    libsPath: 'lib',
    SlideSpeed: 200,
    megaMenuClass: 'mai-mega-menu-container',
    megaMenuColumnClass: 'mai-mega-menu-column',
    megaMenuSectionClass: 'mai-mega-menu-section',
    navTabsClass: 'mai-nav-tabs',
    subNavClass: 'mai-sub-nav'
  };

  var megaMenu, navTabs, colors = {};

  // Main tabs active state sync
  function tabSync() {
    var tabs = $( '.navbar-nav > .nav-item', navTabs );
    var openTabs = tabs.filter( '.open' );

    if( !openTabs.length ) {
      tabs.filter( ':first-child' ).addClass( 'open' );
    }
  }

  // Sub navigation interaction
  function subNav() {
    $('.nav-link, .dropdown-item', navTabs).on('click',function( e ){
      var _this = $( this );
      var parent = _this.parent();
      var openElements = parent.siblings( '.open' );
      var subNav = _this.next( '.' + config.subNavClass );
      var slideSpeed = config.SlideSpeed;

      function closeSubMenu( subMenu ){
        var _parent = $( subMenu ).parent();
        var openChildren = $( '.nav-item.open, .' + config.megaMenuSectionClass + '.open', _parent );

        subMenu.slideUp({ duration: slideSpeed, complete: function(){
          _parent.removeClass( 'open' );
          openChildren.removeClass( 'open' );
          $( this ).removeAttr( 'style' );
        }});
      }

      function openSubMenu( subMenu ){
        var _parent = subMenu.parent();
        var openSubMenus = false;

        // Get the open sub menus
        openSubMenus = _parent.siblings( '.open' );

        if( _parent.hasClass( config.megaMenuSectionClass ) ) {
          megaColumn = _parent.parent();
          openSubMenus = openSubMenus.add( megaColumn.siblings().find( '.' + config.megaMenuSectionClass + '.open' ) );
        }
        // If there are open sub menus close them
        if( openSubMenus ) {
          closeSubMenu( $( '> .' + config.subNavClass, openSubMenus ) );
        }

        subMenu.slideDown({ duration: slideSpeed, complete: function(){
          _parent.addClass( 'open' );
          $( this ).removeAttr( 'style' );
        }});
      }

      // Check if the event is fired from mobile
      if( $.isXs() ) {

        if( subNav.length ) {
          if( parent.hasClass( 'open' ) ) {
            closeSubMenu( subNav );
          } else {
            openSubMenu( subNav );
          }
          e.preventDefault();
        }

        // Stop default bootstrap dropdown interaction
        e.stopPropagation();
      } else if ( parent.parent().hasClass('navbar-nav') ) {
        if ( subNav.length ) {
          openElements.removeClass( 'open' );
          parent.addClass( 'open' );

          e.preventDefault();
        }
      }
    });

    // Sync tabs when resize between mobile and desktop resolutions
    $(window).resize(function() {
      waitForFinalEvent(function() {
        if( !$.isXs() ) {
          tabSync();
        }
      }, 100, "sync_tabs");
    });
  }

  // Get the template css colors into js vars
  function getColor( c ){
    var tmp = $("<div>", { class: c }).appendTo("body");
    var color = tmp.css("background-color");
    tmp.remove();

    return color;
  }

  // Wait for final event on window resize
  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "x1x2x3x4";
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();

  // Scroll plugin init
  function scrollerInit(){
    $(".mai-scroller").perfectScrollbar();
  }

  return {
    conf: config,
    color: colors,
    init: function (options) {

      megaMenu = document.getElementsByClassName( config.megaMenuClass );
      navTabs = document.getElementsByClassName( config.navTabsClass );

      // Extends basic config with options
      $.extend( config, options );

      // Get colors
      colors.primary = getColor('clr-primary');
      colors.success = getColor('clr-success');
      colors.info    = getColor('clr-info');
      colors.warning = getColor('clr-warning');
      colors.danger  = getColor('clr-danger');
      colors.grey    = getColor('clr-grey');
      colors.dark    = getColor('clr-dark');
      colors.light   = getColor('clr-light');
      colors.black   = getColor('clr-black');

      // Navigation tabs
      subNav();

      // Scroller Plugin
      scrollerInit();
      
      // Core public function
      // Prevent settings dropdown closes on click
      $(".mai-settings .dropdown-menu").on("click",function( e ){
        e.stopPropagation();
      });

      // Tooltips
      $('[data-toggle="tooltip"]').tooltip();
      
      // Popover
      $('[data-toggle="popover"]').popover();
    }
  };
 
})();