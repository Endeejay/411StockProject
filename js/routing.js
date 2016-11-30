// app.js
var stockApp = angular.module('stockApp', ['ui.router','app.directives.makeCharts','bw.paging']);

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
        .state('datePicker', {
          views: {
            content: {
              templateUrl: 'templates/historicHome.html',
              controller: 'DatePickerController'
            }
          } 
        })
        .state('historic', {
          views: {
            header: {
              templateUrl: 'templates/dateHeader.html',
            },
            nav: {
              templateUrl: 'templates/historicNavbar.html'
            },
            slider: {
              templateUrl: 'templates/datePickSlider.html',
              controller: 'SliderController'
            },
            content: {
              templateUrl: 'templates/historicHome.html',
              controller: 'HomeController'
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
          url: '/historicDetails',
          views: {
            "content@": {
              templateUrl: 'templates/buySellDetails.html',
              controller: 'DetailsController'
            }
          },
          params: {stockObj: Object}
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
               templateUrl: 'templates/liveHome.html',
               controller: 'HomeController'
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
           url: '/liveDetails',
           views: {
             "content@": {
               templateUrl: 'templates/buySellDetails.html',
               controller: 'DetailsController'
             }
           },
           params: {stockObj: Object}
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
