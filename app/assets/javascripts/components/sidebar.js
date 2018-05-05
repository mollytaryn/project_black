(function () {

  var initSidebar = function () {
    var $menu = $('.Header-menu');
    var $sidebar = $('.Sidebar--left');

    $menu.on('click', function () {
      $(this).toggleClass('open');
      $sidebar.toggleClass('is-open');
    });
  };

  Black.Sidebar = function () {
    initSidebar();
  };
}(this));
