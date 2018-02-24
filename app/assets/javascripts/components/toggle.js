(function () {

  var initToggle = function () {
    var $trigger = $('.js-Trigger'),
        $hiddenContainer = $('.js-Container');

    $trigger.on('click', function () {
      $hiddenContainer.toggleClass('is-open');
    });
  };

  Black.Toggle = function () {
    initToggle();
  };
}(this));
