stockApp.controller('MainController', ['$scope', 'DBService', function MainController($scope, DBService) {

DBService.initializeDBAtTheBeginningOfStockApp();
//DBService.addPortfolio("name", 0, 0, 0, 30);
//DBService.addPortfolio("name", 0, 0, 0, 30);
//DBService.getPortfolioIds();
}]);
