stockApp.controller('WatchController', ['$scope', '$stateParams', '$state', 'WatchService', 'SQLDBService', function WatchController($scope, $stateParams, $state, WatchService, SQLDBService) {
	var state = $state.current.name
	var currentStateString = state.substr(0, state.indexOf('.'));
	$scope.currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
	$scope.usersWatchedStocks = SQLDBService.getWatch($scope.currentPortfolio[0].portfolioId);
}]);
