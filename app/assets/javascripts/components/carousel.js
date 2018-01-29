(function () {

  var initShift = function () {
    var $container = $('.AreaContainer'),
        numberOfAreas = $('.Area').length,
        $shiftLeft = $('.js-shiftLeft'),
        $shiftRight = $('.js-shiftRight');

    $shiftLeft.on('click', function () {
      if (numberOfAreas !== 1) {
        numberOfAreas-=1;
        $container.animate({ 'left': '+=50%' }, 800);
      }
    });

    $shiftRight.on('click', function () {
      if (numberOfAreas !== $('.Area').length) {
        numberOfAreas+=1
        $container.animate({ 'left': '-=50%' }, 800);
      }
    });
  };

  Black.Carousel = function () {
    initShift();
  };
}(this));
