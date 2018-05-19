(function () {

  var initAmortization = function () {
    var $selectedLoan = $('js-Tile, .is-selected'),
        loanBalance = $selectedLoan.data('loan-balance'),
        monthlyInterestRate = $selectedLoan.data('monthly-interest-rate'),
        minPaymentDue = $selectedLoan.data('min-payment-due'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        balance = loanBalance,
        monthlyInterestPrincipalBalance = [];

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

    function buildAmortization(balance, map) {
      monthlyInterestPrincipalBalance = []
      while (balance > minPaymentDue) {
        new_balance = balance - (principalThisMonth(balance) + parseInt(map))
        monthlyInterestPrincipalBalance.push([round(interestThisMonth(balance)), round(principalThisMonth(balance)), round(new_balance)])
        balance = new_balance
      }
      return monthlyInterestPrincipalBalance
    };

    $monthlyAdditionalPayment.keyup(function () {
      var mAP = monthlyAdditionalPayment();
      console.log(buildAmortization(balance, mAP));
    });
  }

  Black.Amortization = function () {
    initAmortization();
  };
}(this));
