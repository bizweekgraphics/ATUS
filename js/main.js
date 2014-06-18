var app = angular.module("ATUS", ['ngResource', 'ngRoute', 'd3']);

app.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : '/ATUS/templates/home.html',
      controller  : 'HomeCtrl'
    })
});
