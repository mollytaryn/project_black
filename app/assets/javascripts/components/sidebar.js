(function () {

  var initCloseRight = function () {
    var $trigger = $('.CloseButton'),
        $sidebar = $('.Sidebar--right');

    $trigger.on('click', function () {
      $sidebar.removeClass('is-open');
    });
  };

  var initOpenLeft = function () {
    var $menu = $('.Header-menu'),
        $sidebar = $('.Sidebar--left');

    $menu.on('click', function () {
      $(this).toggleClass('open');
      $sidebar.toggleClass('is-open');
    });
  };

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

  Black.Sidebar = function () {
    initCloseRight();
    initOpenLeft();
    initScroll();
  };
}(this));
