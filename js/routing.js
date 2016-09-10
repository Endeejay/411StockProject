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
         controller : 'homeController',
    })

});

stockApp.controller('mainController', function($scope) {
  $scope.message = "Selection page";
  $scope.isSelectPage = true;
});

stockApp.controller('homeController', function($scope) {
  $scope.message = "Home Data page";
});
