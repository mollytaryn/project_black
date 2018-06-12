var formatCurrency = function (number) {
  var n = Math.abs((Math.round(number))).toString();
  if (n.length > 3) {
    var number_array = n.split(''),
        iterations = Math.floor(n.length/3);
    for (var i = 0; i < iterations; i++) {
      var index = (-3 * (i+1));
      number_array.splice((index-i), 0, ',');
      number_array[0] == ',' ? number_array.shift() : number_array;
      var currency_formatted = number_array.join('');
    }
    return ((number < 0 ? '+$' : '$') + currency_formatted);
  } else {
    return ((number < 0 ? '+$' : '$') + n);
  }
};
