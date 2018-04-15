(function () {

  var initTile = function () {
    var $tile = $('.js-Tile');

    $tile.on('click', function () {
      $(this).toggleClass('is-selected');
    });
  };

  Black.Tile = function () {
    initTile();
  };
}(this));
