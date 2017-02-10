(function () {

  var slideDown = function () {
    var $container = $('.js-fadeContainer');

    $container.hide().delay(600).slideDown('slow', function() {
      $(this).delay(4500).fadeOut();
    });
  };

  Black.Animations = function () {
    slideDown();
  };
}(this));
