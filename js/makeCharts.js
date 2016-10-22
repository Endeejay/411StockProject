angular.module('app.directives.makeCharts',[])
// .directive('barChart', function() {
//             return {
//                 //this can only be instansiated using an element
//                 restrict    : 'E',
//                 //making the controller
//                 controller: function($scope){
//                     console.log("SlimBandito");
//                 }
//         }
// });
// .controller('WooCtrl', function ($scope) {

//     $scope.item = {
//         chart: {
//             renderTo: 'container',
//         },
//         title: {
//             text: 'Chart in Electron'
//         },
//         series: [{
//             type: 'line',
//             data: [
//                 ['a', 1], ['b', 3], ['c', 2]
//             ]
//         }],
//         credits: {
//             enabled: false
//         }
//     }

// })

.directive('lineChart', function() {
    return {
        restrict    : 'E',
        replace     : true,
        scope       : {
            config  : '='
        },
        template    : '<div id="container"></div>',
        link        : function (scope, element, attrs) {
            $(element).highcharts(scope.config)
        }
    }
})
