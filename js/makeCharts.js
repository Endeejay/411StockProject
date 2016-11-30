angular.module('app.directives.makeCharts',[])

.directive('lineChart', function() {
    return {
        restrict    : 'E',
        replace     : true,
        scope       : {
            config  : '='
        },
        template    : '<div id="container"></div>',
        link        : function (scope, element, attrs) {
            var chart = undefined;
            scope.$watch("config", function(newValue, oldValue) {
                  //if (chart != undefined) chart.destroy()
                  chart = $(element).highcharts(newValue);
            });
        }
    }
})

.directive('stockChart', function() {
    return {
        restrict    : 'E',
        replace     : true,
        scope       : {
            config  : '='
        },
        template    : '<div id="container"></div>',
        link        : function (scope, element, attrs) {
            var chart = undefined;
            scope.$watch("config", function(newValue, oldValue) {
                  //if (chart != undefined) chart.destroy()
                  chart = $(element).highcharts(newValue);
            });
        }
    }
})
