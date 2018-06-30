// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require Chart.bundle.min
//= require_self
//= require_tree .

'use strict';

window.Black = window.Black || {};

$(document).ready(function () {
  window.Black.Amortization = new Black.Amortization();
  window.Black.Animations = new Black.Animations();
  window.Black.Carousel = new Black.Carousel();
  window.Black.DashboardCharts = new Black.DashboardCharts();
  window.Black.InputErrors = new Black.InputErrors();
  window.Black.Sidebar = new Black.Sidebar();
  window.Black.Tile = new Black.Tile();
  window.Black.Toggle = new Black.Toggle();
});
