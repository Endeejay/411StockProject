stockApp.controller('BuySellController', ['$scope', 'BuySellService', '$state', 'APIService', function BuySellController($scope, BuySellService, $state, APIService) {
//getName();
getAvailableStocks();
//getStock();
// function changeTemplate(){
//   $location.url('/historic.buy_sell');
// }

$scope.settings = {
    currentPage: 0,
    offset: 0,
    pageLimit: 10,
    pageLimits: ['10']
};

$scope.callback = function() {
  console.log('pagination changed...');
}

$scope.getStock = function(symbol){
         APIService.getSingleStock(symbol).then(function(data){
            //set stockReal to the stock object
             $scope.stockReal = data.data[0];
             showDetails($scope.stockReal);
            //subtract stock's opening price from most recent to get diff.
            //$scope.difference = $scope.stockReal.LastPrice - $scope.stockReal.Open;
        })
}

// function getStocksAndCalculateDifference(symbols){
//          APIService.getMultipleStocks(symbols).then(function(data){
//             //set stockReal to the stock object
//             console.log(data);
//         })
// }

$scope.stocks = [];

function getAvailableStocks(){
  APIService.getAllStocks().then(function(data){
    data = data.data;
    $scope.availableStocks = data;
    // for (var i = 0; i < 10; i++) {
    //   $scope.stocks.push($scope.availableStocks[i]);
    // }
    // getStocksAndCalculateDifference($scope.stocks);
    //console.log(data);
  }, function(error){
    console.log(error);
  });
}

 function showDetails(stock){
  if($state.is("live.buy_sell")){
    $state.go('live.buy_sell.details', {stockObj: stock});
  }
  else if($state.is("historic.buy_sell")){
    $state.go('historic.buy_sell.details', {stockObj: stock});
  }
}

function getName(){
 BuySellService.getAllStocks().then(function(data){
   data = data.data;
   makeChart(data)
  }, function(error){
    console.log(error);
  });
}

// var chartArray = [];
$scope.charts = [];

function makeChart(data){
  angular.forEach(data, function(value, key) {
    //changing our dates to utc dates
    var UTCDates = [];
    for(i=0;i<value.Dates.length;i++){
      var parts = value.Dates[i].split('/');
      var utcDate = Date.UTC(parts[2],parts[0]-1,parts[1]);
      UTCDates.push(utcDate);
    }
    for(i=0;i<value.Prices.length;i++){
      var netValue = value.Prices[i]-value.Prices[0];
      if(netValue < 0){
        var color = '#f02d41';
      }else if(netValue > 0){
        var color = '#2DF04E';
      }else {
        var color = '#c3bcad'
      }
    }
    //getting our dat array, and then bigArray and littleArray
    var dat = $.map(UTCDates, function(v,i) {return [v,value.Prices[i]]; });
    var bigArray=[];
    var littleArray = [], size = 2;
    //pusing our spliced array shit to the bigArray
    while (dat.length > 0) {
      bigArray.push(dat.splice(0,size));
    }
    //our chart item
    var item = {
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
          '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            renderTo: 'container',
            backgroundColor: '#3e3e40',
            borderColor: 'black',
            borderWidth: 2,
            marginLeft: 75,
            marginRight: 75,
            events: {
              click: function() {
                if($state.is("live.buy_sell")){
                  $state.go('live.buy_sell.details', {stockObj: value});
                }
                else if($state.is("historic.buy_sell")){
                  $state.go('historic.buy_sell.details', {stockObj: value});
                }
              }
            },
            style: {
              fontFamily: "'Roboto', sans-serif"
            }
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
          type: 'string',
          title: {
            text: 'Prices (USD)',
            style: {
              color: 'white'
            }
          },
          labels: {
            style: {
              color: 'white'
            }
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            format: '{value:%m/%d/%Y}',
            // rotation: 45,
            align: 'left',
            style: {
              color: 'white'
            }
          },
          title: {
              text: 'Dates',
              style: {
              color: 'white'
            }
          }
        },
        series: [{
            name: 'Price',
            showInLegend: false,
            type: 'line',
            data: bigArray,
            color: color
        }],
        credits: {
            enabled: false
        }
      }
      $scope.charts.push(item);
});
}

}]);
