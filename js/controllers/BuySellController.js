stockApp.controller('BuySellController', ['$scope', 'BuySellService', '$state', 'APIService', 'YahooService', 'FactoryService', function BuySellController($scope, BuySellService, $state, APIService, YahooService, FactoryService) {
this.displayStockAndNetDifference = displayStockAndNetDifference;
//getName();
getAvailableStocks();
//getStock();
// function changeTemplate(){
//   $location.url('/historic.buy_sell');
// }
var state = $state.current.name
var currentStateString = state.substr(0, state.indexOf('.'));

$scope.settings = {
    currentPage: 0,
    offset: 0,
    pageLimit: 10,
    pageLimits: ['10']
};

// $scope.callback = callback;
// function callback() {
//   debugger;
//   var stocks = $scope.filteredStock;
//   if(currentStateString === 'live'){
//       var currentDate = new Date();
//       var date = FactoryService.formatDate(currentDate);
//       YahooService.getAllStocks(stocks, "2016/11/25", "2016/11/26", displayStockAndNetDifference);

//     }
    
//   console.log('pagination changed...');
// }

$scope.callback = function() {
  console.log("pagination callback function");
  getAvailableStocks();
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

$scope.stocksData = [];
function getStocksAndCalculateDifference(symbols){
         APIService.getMultipleStocks(symbols).then(function(data){
          $scope.stocksData = [];
            console.log("calc diff" , data.data);
            for (index in data.data) {
              console.log(index, data.data[index]);
              $scope.stocksData.push(data.data[index]);
            }
        })
}

$scope.stocks = [];
function getAvailableStocks(){
  APIService.getAllStocks().then(function(data){
    $scope.stocks = [];
    data = data.data;
    $scope.availableStocks = data;

    
    // for (var i = 0; i < 10; i++) {
    //   $scope.stocks.push($scope.availableStocks[i]);
    // }
    // getStocksAndCalculateDifference($scope.stocks);
    for (var i = ($scope.settings.currentPage*5); i < ($scope.settings.currentPage*5 + 5); i++) {
      $scope.stocks.push($scope.availableStocks[i]);
    }
    console.log("$scope.stocks =",$scope.stocks);
    getStocksAndCalculateDifference($scope.stocks);
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

// function makeChart(data){
//   angular.forEach(data, function(value, key) {
//     //changing our dates to utc dates
//     var UTCDates = [];
//     for(i=0;i<value.Dates.length;i++){
//       var parts = value.Dates[i].split('/');
//       var utcDate = Date.UTC(parts[2],parts[0]-1,parts[1]);
//       UTCDates.push(utcDate);
//     }
//     for(i=0;i<value.Prices.length;i++){
//       var netValue = value.Prices[i]-value.Prices[0];
//       if(netValue < 0){
//         var color = '#f02d41';
//       }else if(netValue > 0){
//         var color = '#2DF04E';
//       }else {
//         var color = '#c3bcad'
//       }
//     }
//     //getting our dat array, and then bigArray and littleArray
//     var dat = $.map(UTCDates, function(v,i) {return [v,value.Prices[i]]; });
//     var bigArray=[];
//     var littleArray = [], size = 2;
//     //pusing our spliced array shit to the bigArray
//     while (dat.length > 0) {
//       bigArray.push(dat.splice(0,size));
//     }
    //our chart item
//     var item = {
//         colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
//           '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
//         chart: {
//             renderTo: 'container',
//             backgroundColor: '#3e3e40',
//             borderColor: 'black',
//             borderWidth: 2,
//             marginLeft: 75,
//             marginRight: 75,
//             events: {
//               click: function() {
//                 if($state.is("live.buy_sell")){
//                   $state.go('live.buy_sell.details', {stockObj: value});
//                 }
//                 else if($state.is("historic.buy_sell")){
//                   $state.go('historic.buy_sell.details', {stockObj: value});
//                 }
//               }
//             },
//             style: {
//               fontFamily: "'Roboto', sans-serif"
//             }
//         },
//         title: {
//             text: value.Name,
//             style: {
//               color: 'white'
//             }
//         },
//         subtitle: {
//             text: value.Symbol,
//             style: {
//               color: '#E0E0E3'
//             }
//         },
//         yAxis: {
//           type: 'string',
//           title: {
//             text: 'Prices (USD)',
//             style: {
//               color: 'white'
//             }
//           },
//           labels: {
//             style: {
//               color: 'white'
//             }
//           }
//         },
//         xAxis: {
//           type: 'datetime',
//           labels: {
//             format: '{value:%m/%d/%Y}',
//             // rotation: 45,
//             align: 'left',
//             style: {
//               color: 'white'
//             }
//           },
//           title: {
//               text: 'Dates',
//               style: {
//               color: 'white'
//             }
//           }
//         },
//         series: [{
//             name: 'Price',
//             showInLegend: false,
//             type: 'line',
//             data: bigArray,
//             color: color
//         }],
//         credits: {
//             enabled: false
//         }
//       }
//       $scope.charts.push(item);
// });
// }

function displayStockAndNetDifference(stocks){
  $scope.netDiff = [];
  debugger;
  for (index in stocks){
    var difference = stocks[index][0].close - stocks[index][0].open;
    difference = difference.toFixed(2);
    $scope.netDiff.push(difference);
  };
  $scope.netDifference = stocks;
  debugger;
  //$scope.availableStocks = stocks[];
}
}]);
