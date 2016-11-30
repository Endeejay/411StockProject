stockApp.controller('BuySellController', ['$scope', 'BuySellService', '$state', 'APIService', 'YahooService', 'FactoryService', function BuySellController($scope, BuySellService, $state, APIService, YahooService, FactoryService) {
//getName();
getAvailableStocks();
//getStock();
// function changeTemplate(){
//   $location.url('/historic.buy_sell');
// }
var state = $state.current.name
var currentStateString = state.substr(0, state.indexOf('.'));


$scope.page = 1;
$scope.pageSize = 5;

$scope.callback = function(page) {
  // console.log("page = ", page);
  $scope.page = page;
  getAvailableStocks();
}


$scope.getStock = function(symbol){
         APIService.getSingleStock(symbol).then(function(data){
            //set stockReal to the stock object
             $scope.stockReal = data.data[0];
             showDetails($scope.stockReal);
        })
}

$scope.stocksData = [];
function getStocksAndCalculateDifference(symbols){
         APIService.getMultipleStocks(symbols).then(function(data){
          $scope.stocksData = [];
            console.log("calc diff" , data.data);
            for (index in data.data) {
              console.log(index, data.data[index]);
              //console.log(index, data.data[index]); 
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
    for (var i = ($scope.page*5); i < ($scope.page*5 + 5); i++) {
      $scope.stocks.push($scope.availableStocks[i]);
    }
    //console.log("$scope.stocks =",$scope.stocks);
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

}]);
