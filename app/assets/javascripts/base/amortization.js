(function () {

  var amortizationSchedule = function () {
    var $selectedLoan = $('js-Tile, .is-selected'),
        loanBalance = $selectedLoan.data('loan-balance'),
        monthlyInterestRate = $selectedLoan.data('monthly-interest-rate'),
        minPaymentDue = $selectedLoan.data('min-payment-due'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        balance = loanBalance;

    function interestThisMonth(balance) {
      return balance * monthlyInterestRate
    };

    function monthlyAdditionalPayment() {
      return ($monthlyAdditionalPayment.val().length ? $monthlyAdditionalPayment.val() : 0);
    };

    function principalThisMonth(balance) {
      return minPaymentDue - interestThisMonth(balance)
    };

    function round(value) {
      return Math.round(100 * value)/100
    };

    function amortizationSchedule(balance, map) {
      monthlyInterestPrincipalBalance = []
      while (parseInt(balance) > parseInt(minPaymentDue)) {
        new_balance = balance - (principalThisMonth(balance) + parseInt(map))
        monthlyInterestPrincipalBalance.push([round(interestThisMonth(balance)), round(principalThisMonth(balance)), round(new_balance)])
        balance = new_balance
      }
      return monthlyInterestPrincipalBalance
    };
    return amortizationSchedule(balance, monthlyAdditionalPayment());
  };

  var calculateInterestDue = function () {
    interestDue = 0
    $.each(amortizationSchedule(), function(i, v) {
      interestDue += v[0]
    });
    return interestDue;
  };

  var initSavedInterest = function (selected_loan) {
    var $selectedLoan = (typeof selected_loan == 'undefined' ? $('.js-Tile, .is-selected') : selected_loan),
        loanInterest = $selectedLoan.data('total-interest'),
        $interestSaved = $('.js-InterestSaved'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        $totalInterest = $('.js-TotalInterest'),
        allLoanInterest = $totalInterest.data('all-loan-interest');

    $monthlyAdditionalPayment.keyup(function () {
      var interestSaved = (loanInterest - calculateInterestDue());
      $interestSaved.html('$' + Math.round(interestSaved));
      $totalInterest.html('$' + Math.round(allLoanInterest - interestSaved));
    });
  };

  var initSelectedLoan = function () {
    var $loans = $('.js-Tile'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        $interestSaved = $('.js-InterestSaved'),
        $totalInterest = $('.js-TotalInterest'),
        allLoanInterest = $totalInterest.data('all-loan-interest');

    $loans.on('click', function () {
      var $selectedLoan = $(this);

      $monthlyAdditionalPayment.val('');
      $interestSaved.html('$0');
      $totalInterest.html('$' + Math.round(allLoanInterest));
      initSavedInterest($selectedLoan);
    });
  };

  Black.Amortization = function () {
    initSavedInterest();
    initSelectedLoan();
  };
}(this));
