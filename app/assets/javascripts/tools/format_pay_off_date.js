var payOffDate = function (numPaymentsLeft) {
  var payOffDate = undefined,
      today = new Date();

  payOffDate = new Date(today.setMonth(today.getMonth() + numPaymentsLeft));
  return payOffDate;
};

var formatPayOffDate = function(numPaymentsLeft) {
  var formatted_date = '',
      date = payOffDate(numPaymentsLeft),
      month = String(date).slice(4, 7),
      year = String(date).slice(11, 15);

  formatted_date = month + ' ' + year
  return formatted_date;
};
