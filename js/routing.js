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
              templateUrl: 'templates/dateHeader.html'
            },
            nav: {
              templateUrl: 'templates/historicNavbar.html'
            },
            content: {
              templateUrl: 'home.html'
            }
          }
        })
        .state('historic.buy_sell', {
            controller: 'BuySellController',
            services: 'BuySellService',
            views: {
              content: {
                templateUrl: 'buy_sell.html'
              }
            }
        })
        .state('historic.user', {
            views: {
              content: {
                templateUrl: 'user.html'
              }
            }
        })
        .state('historic.portfolio', {
            views: {
              content: {
                templateUrl: 'portfolio.html'
              }
            }
        })
        .state('historic.watch', {
            views: {
              content: {
                templateUrl: 'watch.html'
              }
            }
        })
        .state('live', {
           views: {
             nav: {
               templateUrl: 'templates/liveNavbar.html'
             },
             content: {
               templateUrl: 'home.html',
               controller: 'LiveController'
             }
           }
        })
        .state('live.buy_sell', {
            controller: 'BuySellController',
            services: 'BuySellService',
            views: {
              content: {
                templateUrl: 'buy_sell.html',
              }
            }
        })
        .state('live.user', {
            views: {
              content: {
                templateUrl: 'user.html'
              }
            }
        })
        .state('live.portfolio', {
            views: {
              content: {
                templateUrl: 'portfolio.html'
              }
            }
        })
        .state('live.watch', {
            views: {
              content: {
                templateUrl: 'watch.html'
              }
            }
        });
        $urlRouterProvider.otherwise('/root');
});
