Chart.defaults.global.defaultFontColor = "#fff";
Chart.defaults.global.defaultFontFamily = "Montserrat";

var lineChartDataset = function (label, balances, color, width, borderDash) {
  dataset = {
    label: label,
    data: balances,
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: color,
    borderWidth: width,
    borderDash: [borderDash],
    pointRadius: 0,
    pointHitRadius: 5,
    pointHoverBackgroundColor: color,
    pointHoverBorderColor: "#fff",
    pointHoverBorderWidth: 3,
    pointHoverRadius: 10,
    lineTension: 0
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
        lineChartDataset("Current", principalBalances, "#2ac1ef", 4, 0),
        lineChartDataset("Saved", [], "#fff", 3, 7)
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
  return amortizationChart;
};

var updateAmortizationChart = function(chart, updatedBalances) {
  chart.data.datasets[1].data = updatedBalances
  chart.update();
};
