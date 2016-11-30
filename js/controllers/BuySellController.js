stockApp.controller('BuySellController', ['$scope', 'BuySellService', '$state', 'APIService', 'YahooService', 'FactoryService', 'SQLDBService', 'MathService', function BuySellController($scope, BuySellService, $state, APIService, YahooService, FactoryService, SQLDBService, MathService) {
//getName();
getAvailableStocks();
//getStock();
// function changeTemplate(){
//   $location.url('/historic.buy_sell');
// }
var state = $state.current.name;
var currentStateString = state.substr(0, state.indexOf('.'));
$scope.availableStocks = [];
$scope.page = 1;
var currentStateString = state.substr(0, state.indexOf('.'));
var currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);

//using this to display the proper collection
if(state === "live.buy_sell"){
  $scope.live = true;
}else{
  $scope.live = false;
}


$scope.callback = function(page) {
  // console.log("page = ", page);
  $scope.page = page;
  console.log($scope.page);
  getStocksForCurrentPage();
}

$scope.getStock = function(symbol){
   if(currentStateString === 'live'){
         APIService.getSingleStock(symbol).then(function(data){
            //set stockReal to the stock object
             $scope.stockReal = data.data[0];
             showDetails($scope.stockReal);
        })
       }
       else if(currentStateString === 'historic'){
        var today = currentPortfolio[0].currentDate;
        YahooService.getAStock(symbol, today, today).then(function(data){
            $scope.stockReal = data[0];
             showDetails($scope.stockReal);
        })
       }
}


$scope.stocksData = [];

function getStocksForCurrentPage(){
  for (var i = (($scope.page-1) * 5); i < (($scope.page-1)* 5 + 5); i++) {
      APIService.getSingleStock($scope.availableStocks[i]).then(function(data){
         $scope.availableStocks[i] = data.data[0];
      })
  }
}

function getStocksAndCalculateDifference(symbols){
  if(currentStateString === 'live'){
    APIService.getMultipleStocks(symbols).then(function(data){
    $scope.stocksData = [];
      console.log("calc diff" , data.data);
      for (index in data.data) {
        console.log(index, data.data[index]);
        //console.log(index, data.data[index]);
        $scope.stocksData.push(data.data[index]);
      }
    })
  }else if(currentStateString === 'historic'){
    var today = currentPortfolio[0].currentDate;
    YahooService.getMultipleStocks(symbols, today, today).then(function(data){
      $scope.stocksData = [];
      console.log("calc diff" , data);
      for (var key in data) {
        if(data.hasOwnProperty(key)){
          var diff = data[key][0].close - data[key][0].open;
          var historicStockObj = FactoryService.makeObjectForMarketPage(key,diff);
          $scope.stocksData.push(historicStockObj);
        }
      }
    })
  }else{
    //throw an error
  }
      APIService.getMultipleStocks(symbols).then(function (data){
        //replaces items if it successfully gets it back from api
        for(var i = 0 ; i<data.data.length; i++){
          var index = getIndex(data.data[i]);
          if(index != null){
             //replaces objects already in collection since regular way threw errors
             Array.prototype.splice.apply($scope.availableStocks, [index, 1].concat(data.data[i]));
          }
        }
      });
}

function getIndex(stock){
  var index = null;
  for(var i = (($scope.page-1) * 5); i < (($scope.page-1)* 5 + 5); i++){
    if($scope.availableStocks[i].Symbol == stock.Symbol){
      index = i;
      break;
    }
  }
  return index;
}

function getAvailableStocks(){
  APIService.getAllStocks().then(function(data){
    for (var index in data.data) {
      var stockObj = {
                      Name: " ",
                      Symbol: data.data[index],
                      LastPrice: -1,
                      Change: -1,
                      ChangePercent: " ",
                      Timestamp: " ",
                      Volume: -1,
                      High: -1,
                      Low: -1,
                      Open: -1,
                      Close: -1
                    };
      $scope.availableStocks.push(stockObj);
    }
    getStocksForCurrentPage();
    //console.log("$scope.stocks =",$scope.stocks);
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



}]);
