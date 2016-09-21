var stockApp = angular.module('stockApp', ['ngRoute']);
var isSelectPage = true;

stockApp.config(function($routeProvider) {
    $routeProvider

    .when('/', {
         templateUrl : 'SelectLiveOrHistoricData.html',
         controller : 'mainController'
    })
    .when('/home', {
         templateUrl : 'home.html',
         controller : 'homeController'
    })
    .when('/user', {
         templateUrl : 'user.html',
         controller : 'homeController'
    })
    .when('/buy_sell', {
         templateUrl : 'buy_sell.html',
         controller : 'BuySellController'
    })
    .when('/portfolio', {
         templateUrl : 'portfolio.html',
         controller : 'homeController'
    })
    .when('/watch', {
         templateUrl : 'watch.html',
         controller : 'homeController'
    })
});

stockApp.controller('mainController', function($scope) {
  $scope.message = "Selection page";
  $scope.isSelectPage = true;
});

stockApp.controller('homeController', function($scope) {
  $scope.message = "Home Data page";
});
