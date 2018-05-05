(function () {

  var initScroll = function () {
    var $container = $('.Sidebar-inner');
    $('body').scroll(function () {
      if ($(this).scrollTop() > 70) {
        $container.css({top: '0'});
      } else {
        $container.css({top: '4rem'});
      }
    });
  };

  var initOpen = function () {
    var $menu = $('.Header-menu');
    var $sidebar = $('.Sidebar--left');

    $menu.on('click', function () {
      $(this).toggleClass('open');
      $sidebar.toggleClass('is-open');
    });
  };

  Black.Sidebar = function () {
    initScroll();
    initOpen();
  };
}(this));
