(function () {

  var amortizationSchedule = function () {
    var $selectedLoan = $('js-Tile, .is-selected'),
        loanPrincipal = $selectedLoan.data('principal'),
        loanMonthlyInterestRate = $selectedLoan.data('monthly-interest-rate'),
        loanMinPaymentDue = $selectedLoan.data('min-payment-due'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        balance = loanPrincipal;

    function interestThisMonth(balance) {
      return balance * loanMonthlyInterestRate;
    }

    function monthlyAdditionalPayment() {
      return ($monthlyAdditionalPayment.val().length ? $monthlyAdditionalPayment.val() : 0);
    }

    function principalThisMonth(balance) {
      return loanMinPaymentDue - interestThisMonth(balance);
    }

    function amortizationSchedule(balance, map) {
      var monthlyInterestPrincipalBalance = [];
      while (parseInt(balance) > parseInt(loanMinPaymentDue)) {
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
        $loanPayOffMonthContainer = $('.js-LoanPayOffMonth');

    $monthlyAdditionalPayment.keyup(function () {
      $loanPayOffMonthContainer.html(formatPayOffDate(amortizationSchedule().length));
    });
  };

  var initSavedInterest = function (selectedLoan) {
    var $selectedLoan = (typeof selectedLoan == 'undefined' ? $('.js-Tile, .is-selected') : selectedLoan),
        loanTotal = $selectedLoan.data('total-paid'),
        loanInterest = $selectedLoan.data('interest'),
        $loanTotalPaidContainer = $('.js-LoanTotalPaid'),
        $loanInterestContainer = $('.js-LoanInterest'),
        $loanInterestSavedContainer = $('.js-LoanInterestSaved'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment');

    $monthlyAdditionalPayment.keyup(function () {
      var loanInterestSaved = (loanInterest - calculateInterestDue());
      $loanTotalPaidContainer.html(formatCurrency(loanTotal - loanInterestSaved));
      $loanInterestContainer.html(formatCurrency(loanInterest - loanInterestSaved));
      $loanInterestSavedContainer.html(formatCurrency(loanInterestSaved));
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

  var initSwitchLoans = function () {
    var $loans = $('.js-Tile'),
        $loanNameContainer = $('.js-LoanName'),
        $loanTotalPaidContainer = $('.js-LoanTotalPaid'),
        $loanPrincipalContainer = $('.js-LoanPrincipal'),
        $loanInterestContainer = $('.js-LoanInterest'),
        $loanInterestSavedContainer = $('.js-LoanInterestSaved'),
        $loanPayOffMonthContainer = $('.js-LoanPayOffMonth'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment');

    $loans.on('click', function () {
      var $selectedLoan = $(this),
          loanName = $selectedLoan.data('name'),
          loanTotal = $selectedLoan.data('total-paid'),
          loanPrincipal = $selectedLoan.data('principal'),
          loanInterest = $selectedLoan.data('interest'),
          loanPayOffMonth = $selectedLoan.data('pay-off-month');

      $monthlyAdditionalPayment.val('');
      $loanNameContainer.html(loanName);
      $loanTotalPaidContainer.html(formatCurrency(loanTotal));
      $loanPrincipalContainer.html(formatCurrency(loanPrincipal));
      $loanInterestContainer.html(formatCurrency(loanInterest));
      $loanInterestSavedContainer.html('$0');
      $loanPayOffMonthContainer.html(loanPayOffMonth);
    });
  };

  Black.Amortization = function () {
    initSavedInterest();
    initSavedMonths();
    initSelectedLoan();
    initSwitchLoans();
  };
}(this));
