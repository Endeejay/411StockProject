// app.js
var stockApp = angular.module('stockApp', ['ui.router','app.directives.makeCharts']);

stockApp.run(['$rootScope', '$state',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
  }
]);
stockApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('root', {
          url: '/',
          views: {
            content: {
              templateUrl: 'templates/selectPage.html',
              controller: 'MainController'
            }
          }
        })
        .state('historic', {
          views: {
            header: {
              templateUrl: 'templates/dateHeader.html',
              controller: 'DatePickerController'
            },
            nav: {
              templateUrl: 'templates/historicNavbar.html'
            },
            content: {
              templateUrl: 'templates/historicHome.html'
            }
          }
        })
        .state('historic.buy_sell', {
            controller: 'BuySellController',
            services: 'BuySellService',
            views: {
              "content@": {
                templateUrl: 'buy_sell.html'
              }
            }
        })
        .state('historic.buy_sell.details', {
          url: '/details',
          views: {
            "content@": {
              templateUrl: 'templates/buySellDetails.html',
              controller: 'DetailsController'
            }
          },
          params: {stockObj: null}
        })
        .state('historic.user', {
            views: {
              "content@": {
                templateUrl: 'user.html'
              }
            }
        })
        .state('historic.portfolio', {
            views: {
              "content@": {
                templateUrl: 'portfolio.html',
                controller: 'PortfolioController'
              }
            }
        })
        .state('historic.watch', {
            views: {
              "content@": {
                templateUrl: 'watch.html',
                controller: 'WatchController'
              }
            }
        })
        .state('live', {
           views: {
             nav: {
               templateUrl: 'templates/liveNavbar.html'
             },
             content: {
               templateUrl: 'templates/liveHome.html'
             }
           }
        })
        .state('live.buy_sell', {
            controller: 'BuySellController',
            services: 'BuySellService',
            views: {
              "content@": {
                templateUrl: 'buy_sell.html',
              }
            }
        })
        .state('live.buy_sell.details', {
           url: '/details',
           views: {
             "content@": {
               templateUrl: 'templates/buySellDetails.html',
               controller: 'DetailsController'
             }
           },
           params: {stockObj: null}
        })
        .state('live.user', {
            views: {
              "content@": {
                templateUrl: 'user.html'
              }
            }
        })
        .state('live.portfolio', {
            views: {
              "content@": {
                templateUrl: 'portfolio.html',
                controller: 'PortfolioController' 
              }
            }
        })
        .state('live.watch', {
            views: {
              "content@": {
                templateUrl: 'watch.html',
                controller: 'WatchController'
              }
            }
        });
        $urlRouterProvider.otherwise('/root');
});
