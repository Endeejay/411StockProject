stockApp.controller('WatchController', ['$scope', '$stateParams', '$state', 'WatchService', 'DBService', function WatchController($scope, $stateParams, $state, WatchService, DBService) {
	var isLive = DBService.getCurrentState($state.current.name);
	$scope.currentPortfolio = DBService.getCurrentPortfolio(isLive);
	$scope.usersWatchedStocks = DBService.getAllWatchForPortfolio($scope.currentPortfolio[0].portfolio_Id);
}]);
