(function () {

  var initDashboardChart = function () {
    var $container = $('.js-dashboardChart'),
        principalBalances = $container.data('principal-balances'),
        monthsLeft = $container.data('months-array');

    Chart.defaults.global.defaultFontColor = "#fff";
    Chart.defaults.global.defaultFontFamily = "Montserrat";

    var dashboardChart = new Chart($container, {
      type: 'line',
      data: {
        labels: monthsLeft,
        datasets: [{
          label: "My First dataset",
          data: principalBalances,
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "#2ac1ef",
          borderWidth: 4,
          lineTension: 0,
          pointRadius: 0,
          pointHitRadius: 5,
          pointHoverBackgroundColor: "#2ac1ef",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 3,
          pointHoverRadius: 10,
        },
        {
          label: "My Second dataset",
          data: principalBalances,
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "#fff",
          borderDash: [5],
          pointRadius: 0,
          pointHoverBackgroundColor: "#000",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 2,
          pointHoverRadius: 6,
        }]
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

  Black.DashboardCharts = function () {
    if ($('.js-dashboardChart').length) {
      initDashboardChart();
    }
  };
}(this));
