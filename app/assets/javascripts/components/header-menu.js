(function () {

  var initHeaderMenu = function () {
    var $menu = $('.Header-menu');
    var $sidebar = $('.Sidebar');

    $menu.on('click', function () {
      $(this).toggleClass('open');
      $sidebar.toggleClass('is-open');
    });
  };

  Black.HeaderMenu = function () {
    initHeaderMenu();
  };
}(this));
