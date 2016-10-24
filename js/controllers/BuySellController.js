
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
   makeChart(data)
  }, function(error){
    console.log(error);
  });
}

function makeChart(data){
  angular.forEach(data, function(value, key) {
    //changing our dates to utc dates
    var UTCDates = [];
    for(i=0;i<value.Dates.length;i++){
      var parts = value.Dates[i].split('/');
      var utcDate = Date.UTC(parts[2],parts[0]-1,parts[1]);
      UTCDates.push(utcDate);
    }
    console.log(UTCDates);
    //getting our dat array, and then bigArray and littleArray
    var dat = $.map(UTCDates, function(v,i) {return [v,value.Prices[i]]; });
    var bigArray=[];
    var littleArray = [], size = 2;
    //pusing our spliced array shit to the bigArray
    while (dat.length > 0) {
      bigArray.push(dat.splice(0,size));
    }

    $scope.item = {
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
          '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            renderTo: 'container',
            backgroundColor: '#3e3e40'
        },
        title: {
            text: value.Name,
            style: { 
              color: 'white'
            }
        },
        subtitle: {
            text: value.Symbol,
            style: { 
              color: '#E0E0E3'
            }
        },
        yAxis: {
          title: {
            text: 'Prices',
            style: { 
              color: 'white'
            }
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            format: '{value:%Y-%m-%d}',
            rotation: 45,
            align: 'left'
          },
          title: {
              text: 'Dates',
              style: { 
              color: 'white'
            }
          }
        },
        series: [{
            type: 'line',
            data: bigArray
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
