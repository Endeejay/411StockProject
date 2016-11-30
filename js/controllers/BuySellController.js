stockApp.controller('BuySellController', ['$scope', 'BuySellService', '$state', 'APIService', 'FactoryService', function BuySellController($scope, BuySellService, $state, APIService, FactoryService) {
var state = $state.current.name
var currentStateString = state.substr(0, state.indexOf('.'));
$scope.availableStocks = [];
$scope.page = 1;
getAvailableStocks();
var state = $state.current.name
var currentStateString = state.substr(0, state.indexOf('.'));



$scope.callback = function(page) {
  // console.log("page = ", page);
  $scope.page = page;
  console.log($scope.page);
  getStocksForCurrentPage();
}

$scope.getStock = function(symbol){
         APIService.getSingleStock(symbol).then(function(data){
            //set stockReal to the stock object
             $scope.stockReal = data.data[0];
             showDetails($scope.stockReal);
        })
}

function getStocksForCurrentPage(){
      var symbols = []
      for (var i = (($scope.page-1) * 5); i < (($scope.page-1)* 5 + 5); i++) {
          symbols.push($scope.availableStocks[i].Symbol);
      }
      APIService.getMultipleStocks(symbols).then(function (data){
        //replaces objects already in collection since regular way threw errors
        Array.prototype.splice.apply($scope.availableStocks, [($scope.page-1) * 5, data.data.length].concat(data.data));
      });
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
