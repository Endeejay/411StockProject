stockApp.controller('MainController', ['$scope', '$state', 'SQLDBService', 'APIService','FactoryService','YahooService', function MainController($scope, $state, SQLDBService, APIService, FactoryService, YahooService) {
//	APIService.getMultipleStocks(['AAPL', 'GOOGL']);
//DBService.initializeDBAtTheBeginningOfStockApp();
//SQLDBService.clearDB();
SQLDBService.initDb();
$scope.historicClick = function(){
	if(SQLDBService.checkIfPortfolioIdForLiveOrHistoricExists(1) === false){
    	$state.go('datePicker');
  }
  else{
  	$state.go('historic.user');
  }
}
}]);
