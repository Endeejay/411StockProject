stockApp.controller('WatchController', ['$scope', '$stateParams', '$state', 'WatchService', 'SQLDBService', 'APIService', function WatchController($scope, $stateParams, $state, WatchService, SQLDBService, APIService) {
	var state = $state.current.name
	var currentStateString = state.substr(0, state.indexOf('.'));
	$scope.currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
	$scope.usersWatchedStocks = SQLDBService.getWatchByPortfolioId($scope.currentPortfolio[0].portfolioId);

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
}]);
