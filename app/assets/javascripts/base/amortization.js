(function () {

  var amortizationSchedule = function () {
    var $selectedLoan = $('js-Tile, .is-selected'),
        loanBalance = $selectedLoan.data('loan-balance'),
        monthlyInterestRate = $selectedLoan.data('monthly-interest-rate'),
        minPaymentDue = $selectedLoan.data('min-payment-due'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        balance = loanBalance;

    function interestThisMonth(balance) {
      return balance * monthlyInterestRate;
    }

    function monthlyAdditionalPayment() {
      return ($monthlyAdditionalPayment.val().length ? $monthlyAdditionalPayment.val() : 0);
    }

    function principalThisMonth(balance) {
      return minPaymentDue - interestThisMonth(balance);
    }

    function amortizationSchedule(balance, map) {
      var monthlyInterestPrincipalBalance = [];
      while (parseInt(balance) > parseInt(minPaymentDue)) {
        var new_balance = balance - (principalThisMonth(balance) + parseInt(map));
        monthlyInterestPrincipalBalance.push([roundTwoDecimals(interestThisMonth(balance)), roundTwoDecimals(principalThisMonth(balance)), roundTwoDecimals(new_balance)]);
        balance = new_balance
      }
      return monthlyInterestPrincipalBalance;
    }
    return amortizationSchedule(balance, monthlyAdditionalPayment());
  }

  var calculateInterestDue = function () {
    var interestDue = 0;
    $.each(amortizationSchedule(), function(i, v) {
      interestDue += v[0];
    });
    return interestDue;
  };

  var initSavedMonths = function (selectedLoan) {
    var $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        $payOffMonthTile = $('.js-PayOffMonthTile');

    $monthlyAdditionalPayment.keyup(function () {
      $payOffMonthTile.html(formatPayOffDate(amortizationSchedule().length));
    });
  };

  var initSavedInterest = function (selectedLoan) {
    var $selectedLoan = (typeof selectedLoan == 'undefined' ? $('.js-Tile, .is-selected') : selectedLoan),
        loanInterest = $selectedLoan.data('total-interest'),
        $interestSaved = $('.js-InterestSaved'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        $interestTile = $('.js-InterestTile');

    $monthlyAdditionalPayment.keyup(function () {
      var interestSaved = (loanInterest - calculateInterestDue());
      $interestSaved.html(formatCurrency(interestSaved));
      $interestTile.html(formatCurrency(loanInterest - interestSaved));
    });
  };

  var initSelectedLoan = function () {
    var $loans = $('.js-Tile');

    $loans.on('click', function () {
      var $selectedLoan = $(this);

      initSavedInterest($selectedLoan);
      initSavedMonths();
    });
  };

  var initSwitchLoanTiles = function () {
    var $loans = $('.js-Tile'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        $interestSaved = $('.js-InterestSaved'),
        $interestTile = $('.js-InterestTile'),
        $principalTile = $('.js-PrincipalTile'),
        $payOffTile = $('.js-PayOffMonthTile');

    $loans.on('click', function () {
      var $selectedLoan = $(this),
          loanInterest = $selectedLoan.data('total-interest'),
          loanPrincipal = $selectedLoan.data('loan-balance'),
          loanPayOffMonth = $selectedLoan.data('pay-off');

      $monthlyAdditionalPayment.val('');
      $interestSaved.html('$0');
      $interestTile.html(formatCurrency(loanInterest));
      $principalTile.html(formatCurrency(loanPrincipal));
      $payOffTile.html(loanPayOffMonth);
    });
  };

  Black.Amortization = function () {
    initSavedInterest();
    initSavedMonths();
    initSelectedLoan();
    initSwitchLoanTiles();
  };
}(this));