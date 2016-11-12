stockApp.controller('WatchController', ['$scope', 'WatchService', 'DBService', function WatchController($scope, WatchService, DBService) {
	
	$scope.usersWatchedStocks = DBService.getAllWatchForPortfolio(0);
	
	$scope.addWatch = function(){
		DBService.addWatch(0, 'GOOGL');
	}

}]);
