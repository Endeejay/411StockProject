
stockApp.controller('BuySellController', ['$scope', 'BuySellService', function BuySellController($scope, BuySellService) {
getName();


// $scope.item = {
//     chart: {
//         renderTo: 'container',
//     },
//     title: {
//         text: "woo"
//     },
//     series: [{
//         type: 'line',
//         data: [
//             ['a', 1], ['b', 3], ['c', 2]
//         ]
//     }],
//     credits: {
//         enabled: false
//     }
// }


function getName(){
 BuySellService.getAllStocks().then(function(data){
   data = data.data;
   debugger;
   makeChart(data)
  }, function(error){
    console.log(error);
  });
}

/*function getJsonObject(data) {
  debugger;
    $scope.daStock = data.data;
}*/

function makeChart(data){
  debugger;
  angular.forEach(data, function(value, key) {
    $scope.item = {
        chart: {
            renderTo: 'container',
        },
        title: {
            text: value.Name
        },
        series: [{
            type: 'line',
            data: [
                [value.Dates, value.Prices]
            ]
        }],
        credits: {
            enabled: false
        }
      }
});

  // $scope.item = {
  //     chart: {
  //         renderTo: 'container',
  //     },
  //     title: {
  //         text: data.Name
  //     },
  //     series: [{
  //         type: 'line',
  //         data: [
  //             ['a', 1], ['b', 3], ['c', 2]
  //         ]
  //     }],
  //     credits: {
  //         enabled: false
  //     }
  //   }
}

}]);
