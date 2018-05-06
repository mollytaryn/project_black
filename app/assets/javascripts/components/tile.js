(function () {

  var initTile = function () {
    var $tile = $('.js-Tile'),
        $sidebar = $('.Sidebar--right');

    $tile.filter(':first').css('is-selected');

    $tile.on('click', function () {
      $tile.removeClass('is-selected');
      $(this).toggleClass('is-selected');
      $sidebar.addClass('is-open');
    });
  };

  Black.Tile = function () {
    initTile();
  };
}(this));
