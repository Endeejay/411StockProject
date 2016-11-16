stockApp.controller('PortfolioController', ['$scope', 'PortfolioService', 'DBService', function PortfolioController($scope, PortfolioService, DBService) {
	$scope.userPortfolios = DBService.getAllPortfoliosForUser();

}]);
