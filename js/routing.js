// app.js
var stockApp = angular.module('stockApp', ['ui.router']);

stockApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('selector',{
            url: '/main',
            templateUrl: 'SelectLiveOrHistoricData.html',
            controller: 'MainController'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'HomeController'
        })

        .state('user', {
            url: '/user',
            templateUrl: 'user.html',
            controller: 'UserController'
        })

        .state('buy_sell', {
            url: '/buy_sell',
            templateUrl: 'buy_sell.html',
            controller: 'BuySellController'
        })

        .state('portfolio', {
            url: '/portfolio',
            templateUrl: 'portfolio.html',
            controller: 'PortfolioController'
        })

        .state('watch', {
            url: '/watch',
            templateUrl: 'watch.html',
            controller: 'WatchController'
        });
});
