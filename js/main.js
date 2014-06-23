var app = angular.module("ATUS", ['ngResource', 'ngRoute', 'd3', 'ui.bootstrap', 'angularSmoothscroll']);

app.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : 'templates/home.html',
      controller  : 'HomeCtrl'
    })
});
