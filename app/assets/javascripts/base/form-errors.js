var formErrors = function (input, message) {
  var $errorContainer = input.closest('.js-fieldContainer').find('.js-errorMessage');

  input.addClass('InputError');
  $errorContainer.html(message);
  input.on('click keydown', function () {
    input.removeClass('InputError');
    $errorContainer.html('');
  });
};
