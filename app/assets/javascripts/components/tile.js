(function () {

  var initTile = function () {
    var $tile = $('.js-Tile');

    $tile.filter(':first').css('is-selected');

    $tile.on('click', function () {
      $tile.removeClass('is-selected');
      $(this).toggleClass('is-selected');
    });
  };

  Black.Tile = function () {
    initTile();
  };
}(this));
