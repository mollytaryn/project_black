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
      while (balance > minPaymentDue) {
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

  var initSavedInterest = function () {
    var $selectedLoan = $('js-Tile, .is-selected'),
        loanInterest = $selectedLoan.data('total-interest')
        allLoanInterest = $selectedLoan.data('all-loan-interest'),
        $interestSaved = $('.js-InterestSaved'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        $totalInterest = $('.js-TotalInterest');

    $monthlyAdditionalPayment.keyup(function () {
      interestSaved = loanInterest - calculateInterestDue()
      $interestSaved.html('$' + Math.round(interestSaved));
      $totalInterest.html('$' + Math.round(allLoanInterest - interestSaved));
    });
  };


  Black.Amortization = function () {
    initSavedInterest();
  };
}(this));
