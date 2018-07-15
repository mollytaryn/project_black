(function () {

  var amortizationSchedule = function () {
    var $selectedLoan = $('js-Tile, .is-selected'),
        loanPrincipal = $selectedLoan.data('principal'),
        loanMonthlyInterestRate = $selectedLoan.data('monthly-interest-rate'),
        loanMaxInterestRate = $selectedLoan.data('max-interest-rate'),
        loanMinPaymentDue = $selectedLoan.data('min-payment-due'),
        $additionalPayment = $('.js-AdditionalPayment'),
        $monthlyAdditionalPayment = $('.js-MonthlyAdditionalPayment'),
        $changedInterestRate = $('.js-ChangedInterestRate'),
        balance = loanPrincipal,
        monthlyIR = monthlyInterestRate(loanMonthlyInterestRate);

    function additionalPayment() {
      return ($additionalPayment.val().length ? $additionalPayment.val() : 0);
    }

    function calcMonthlyInterestRate(interestRate) {
      return ((interestRate / 100) / 12);
    }

    function changedInterestRate() {
      return ($changedInterestRate.val().length ? $changedInterestRate.val() : 0);
    }

    function interestThisMonth(balance) {
      return balance * monthlyIR;
    }

    function monthlyAdditionalPayment() {
      return ($monthlyAdditionalPayment.val().length ? $monthlyAdditionalPayment.val() : 0);
    }

    function monthlyInterestRate(loanInterestRate) {
      var changedIR = changedInterestRate();
      return (changedIR.length ? validInterestRate(changedIR, loanMaxInterestRate) : loanInterestRate);
    }

    function principalThisMonth(balance, interest) {
      return (loanMinPaymentDue - interest);
    }

    function validInterestRate(changedInterestRate, maxInterestRate) {
      var changedInterestRate = parseFloat(changedInterestRate),
          maxInterestRate = parseFloat(maxInterestRate),
          interestRate = (changedInterestRate < maxInterestRate ? changedInterestRate : maxInterestRate);

      return calcMonthlyInterestRate(interestRate);
    }

    function schedule(balance, map) {
      var i = 0,
          monthlyInterestPrincipalBalance = [];

      balance -= additionalPayment();

      while (parseInt(balance) > parseInt(loanMinPaymentDue)) {
        var interest = interestThisMonth(balance),
            principal = principalThisMonth(balance, interest),
            new_balance = balance - (principal + parseInt(map));

        monthlyInterestPrincipalBalance.push([roundTwoDecimals(interest), roundTwoDecimals(principal), roundTwoDecimals(new_balance)]);
        balance = new_balance;
        if(i >= 600) {break;}
        i++;
      }
      return monthlyInterestPrincipalBalance;
    }

    return schedule(balance, monthlyAdditionalPayment());
  }

  var buildNewChartContainer = function () {
    var $chartContainer = $('.js-dashboardChart'),
        $chartOuterContainer = $('#loanChart');

    $chartContainer.remove();
    $chartOuterContainer.append('<canvas class="js-dashboardChart" width="1000" height="400"></canvas>');
  }

  var calculateInterestDue = function (amortSched) {
    var interestDue = 0;

    $.each(amortSched, function(i, v) {
      interestDue += v[0];
    });
    return interestDue;
  }

  var principalBalancesSchedule = function (amortSched) {
    var principalBalances = [];

    $.map(amortSched, function(v) {
      principalBalances.push(v[2])
    });
    return principalBalances;
  }

  var setChangedInterestClass = function (container, loanInterestSaved) {
    if (loanInterestSaved >= 0 && container.hasClass('u-lineThrough') == false) {
      container.addClass('u-lineThrough')
    } else if (loanInterestSaved < 0) {
      container.removeClass('u-lineThrough')
    }
  }

  var initSavedInterest = function (selectedLoan) {
    var $selectedLoan = (typeof selectedLoan == 'undefined' ? $('.js-Tile, .is-selected') : selectedLoan),
        loanTotal = $selectedLoan.data('total-paid'),
        loanInterest = $selectedLoan.data('interest'),
        $chartContainer = $('.js-dashboardChart'),
        $loanPayOffMonthContainer = $('.js-LoanPayOffMonth'),
        $loanTotalPaidContainer = $('.js-LoanTotalPaid'),
        $loanInterestContainer = $('.js-LoanInterest'),
        $loanInterestSavedContainer = $('.js-LoanInterestSaved'),
        $calcAmortization = $('.js-CalcAmortization'),
        amortizationChart = buildAmortizationChart($chartContainer, $selectedLoan);

    $calcAmortization.keyup(function () {
      var amortSched = amortizationSchedule(),
          loanInterestSaved = (loanInterest - calculateInterestDue(amortSched));

      setChangedInterestClass($loanInterestSavedContainer, loanInterestSaved)
      updateAmortizationChart(amortizationChart, principalBalancesSchedule(amortSched));
      $loanPayOffMonthContainer.html(formatPayOffDate(amortSched.length));
      $loanTotalPaidContainer.html(formatCurrency(loanTotal - loanInterestSaved));
      $loanInterestContainer.html(formatCurrency(loanInterest - loanInterestSaved));
      $loanInterestSavedContainer.html(formatCurrency(loanInterestSaved));
    });
  }

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

      buildNewChartContainer();
      initSavedInterest($selectedLoan);

      $calcAmortization.val('');
      $loanNameContainer.html(loanName);
      $loanTotalPaidContainer.html(formatCurrency(loanTotal));
      $loanPrincipalContainer.html(formatCurrency(loanPrincipal));
      $loanInterestContainer.html(formatCurrency(loanInterest));
      $loanInterestSavedContainer.html('$0');
      $loanPayOffMonthContainer.html(loanPayOffMonth);
    });
  }

  Black.Amortization = function () {
    initSavedInterest();
    initSwitchLoans();
  }
}(this));
