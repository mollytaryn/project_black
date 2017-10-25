(function () {

  var initDashboardChart = function () {
    var $container = $('.js-dashboardChart');

    var dashboardChart = new Chart($container, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
        }
        ]
      }
    });

    $container.hide().delay(600).slideDown('slow', function() {
      $(this).delay(4500).fadeOut();
    });
  };

  Black.DashboardCharts = function () {
    if ($('.js-dashboardChart').length) {
      initDashboardChart();
    }
  };
}(this));
