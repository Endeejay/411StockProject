stockApp.controller('WatchController', ['$scope', '$stateParams', '$state', 'WatchService', 'SQLDBService', 'APIService', function WatchController($scope, $stateParams, $state, WatchService, SQLDBService, APIService) {
	var state = $state.current.name
	var currentStateString = state.substr(0, state.indexOf('.'));
	$scope.currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
	$scope.usersWatchedStocks = SQLDBService.getWatchByPortfolioId($scope.currentPortfolio[0].portfolioId);

	$scope.page = 1;
	getWatchForCurrentPage();
	//I'm a noob and can't get this function to return the right value >_<
	// checkIfPriceHasChanged();


	$scope.callback = function(page) {
  		console.log("pagination callback function");
  		$scope.page = page;
  		getWatchForCurrentPage();
	}

	$scope.remove = function(stock){
		Materialize.toast("Removed " + stock.symbol + " from watchlist.", 4000);
		SQLDBService.removeFromWatch(stock.portfolioId, stock.symbol);
		$scope.usersWatchedStocks = SQLDBService.getWatchByPortfolioId($scope.currentPortfolio[0].portfolioId);
	}

	$scope.buy = function(stock){
		APIService.getSingleStock(stock.symbol).then(function(data){
				$scope.stockReal = data.data[0];
				if($state.is("live.watch")){
					$state.go('live.buy_sell.details', {stockObj: $scope.stockReal});
				}
				else if($state.is("historic.watch")){
					$state.go('historic.buy_sell.details', {stockObj: $scope.stockReal});
				}
		})
	}

	function checkIfPriceHasChanged(){
		for (index in $scope.usersWatchedStocks) {
	 		$scope.currentPrice = getCurrentPriceFromAPI($scope.usersWatchedStocks[index]);
			if ($scope.usersWatchedStocks[index].priceWhenAdded != $scope.currentPrice) {
			   console.log("$scope.usersWatchedStocks[index].priceWhenAdded = ", $scope.usersWatchedStocks[index].priceWhenAdded, " currentPrice = ", $scope.currentPrice );
			   //set a scope variable so the difference can be displayed in front end
			}
		}
	}

	function getCurrentPriceFromAPI(stock){
		APIService.getSingleStock(stock.symbol).then(function(data){
				return data.data[0].LastPrice;
		})
	}

	function getWatchForCurrentPage(){
		$scope.currentWatch = [];
		for(var i = (($scope.page - 1) * 3); i < (($scope.page - 1) * 3 + 3); i++){
			if($scope.usersWatchedStocks[i] != undefined)
				$scope.currentWatch.push($scope.usersWatchedStocks[i]);
		}
		console.log($scope.currentWatch);
	}
}]);
