(function () {

  var initMaxValueError = function () {
    var $interestRateInput = $('.js-ChangedInterestRate'),
        maxValue = $interestRateInput.attr('max');

    $interestRateInput.on('keyup', function() {
      if ($interestRateInput.val() > parseFloat(maxValue)) {
        formErrors($interestRateInput, 'At this interest rate your loan would grow.')
      }
    });
  };

  Black.InputErrors = function () {
    initMaxValueError();
  };
}(this));
