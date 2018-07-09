Chart.defaults.global.defaultFontColor = "#fff";
Chart.defaults.global.defaultFontFamily = "Montserrat";

var lineChartDataset = function (label, balances, color, borderDash) {
  dataset = {
    label: label,
    data: balances,
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: color,
    borderWidth: 4,
    borderDash: [borderDash],
    lineTension: 0,
    pointRadius: 0,
    pointHitRadius: 5,
    pointHoverBackgroundColor: color,
    pointHoverBorderColor: "#fff",
    pointHoverBorderWidth: 3,
    pointHoverRadius: 10,
  }
  return dataset;
};

var buildAmortizationChart = function (container, selectedLoan) {
  var principalBalances = selectedLoan.data('principal-balances'),
      monthsLeft = selectedLoan.data('months-array');

  var amortizationChart = new Chart(container, {
    type: 'line',
    data: {
      labels: monthsLeft,
      datasets: [
        lineChartDataset("Current", principalBalances, "#2ac1ef", 0),
        lineChartDataset("Saved", principalBalances, "#fff", 5)
      ]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 12,
            callback: function(value, index, values) {
              return formatPayOffDate(value);
            }
          }
        }],
        yAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            callback: function(value, index, values) {
                return '$' + value;
            }
          }
        }]
      },
      tooltips: {
        intersect: false,
        position: 'nearest',
        mode: 'index',
        axis: 'y'
      }
    }
  });
};
