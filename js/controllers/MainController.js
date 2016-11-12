stockApp.controller('MainController', ['$scope', 'DBService', 'APIService', function MainController($scope, DBService, APIService) {
	//APIService.getMultipleStocks(['AAPL', 'GOOGL']);
	DBService.initializeDBAtTheBeginningOfStockApp();
}]);
