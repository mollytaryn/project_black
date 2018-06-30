(function () {

  var amortizationSchedule = function () {
    var $selectedLoan = $('js-Tile, .is-selected'),
        loanPrincipal = $selectedLoan.data('principal'),
        loanMonthlyInterestRate = $selectedLoan.data('monthly-interest-rate'),
        loanMaxInterestRate = $selectedLoan.data('max-interest-rate'),
        loanMinPaymentDue = $selectedLoan.data('min-payment-due'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        $changedInterestRate = $('.js-ChangedInterestRate'),
        balance = loanPrincipal;

    function calcMonthlyInterestRate(interestRate) {
      return ((interestRate / 100) / 12);
    }

    function interestThisMonth(balance) {
      return balance * monthlyInterestRate(loanMonthlyInterestRate);
    }

    function monthlyInterestRate(loanInterestRate) {
      return ($changedInterestRate.val().length ? validInterestRate($changedInterestRate.val(), loanMaxInterestRate) : loanInterestRate);
    }

    function validInterestRate(changedInterestRate, maxInterestRate) {
      return calcMonthlyInterestRate(changedInterestRate < maxInterestRate ? changedInterestRate : maxInterestRate);
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
    var $calcAmortization = $('.js-CalcAmortization'),
        $loanPayOffMonthContainer = $('.js-LoanPayOffMonth');

    $calcAmortization.keyup(function () {
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
        $calcAmortization = $('.js-CalcAmortization');

    $calcAmortization.keyup(function () {
      var loanInterestSaved = (loanInterest - calculateInterestDue());
      $loanTotalPaidContainer.html(formatCurrency(loanTotal - loanInterestSaved));
      $loanInterestContainer.html(formatCurrency(loanInterest - loanInterestSaved));
      $loanInterestSavedContainer.html(formatCurrency(loanInterestSaved));
      if (loanInterestSaved < 0) {
        $loanInterestSavedContainer.removeClass('u-lineThrough')
      }
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
        $calcAmortization = $('.js-CalcAmortization');

    $loans.on('click', function () {
      var $selectedLoan = $(this),
          loanName = $selectedLoan.data('name'),
          loanTotal = $selectedLoan.data('total-paid'),
          loanPrincipal = $selectedLoan.data('principal'),
          loanInterest = $selectedLoan.data('interest'),
          loanPayOffMonth = $selectedLoan.data('pay-off-month');

      $calcAmortization.val('');
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
