stockApp.controller('MainController', ['$scope', 'DBService', 'SQLDBService', 'APIService', function MainController($scope, DBService, SQLDBService, APIService) {
	//APIService.getMultipleStocks(['AAPL', 'GOOGL']);
	
	//might take a while to run, could use an animation to show loading feedback
	SQLDBService.initDb();
	DBService.initializeDBAtTheBeginningOfStockApp();
}]);
