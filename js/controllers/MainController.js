stockApp.controller('MainController', ['$scope', 'SQLDBService', 'APIService','FactoryService', function MainController($scope, SQLDBService, APIService, FactoryService) {
//	APIService.getMultipleStocks(['AAPL', 'GOOGL']);
//DBService.initializeDBAtTheBeginningOfStockApp();
//SQLDBService.clearDB();
SQLDBService.initDb();
}]);
