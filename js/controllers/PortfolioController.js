stockApp.controller('PortfolioController', ['$scope', '$stateParams', '$state', 'PortfolioService', 'DBService', function PortfolioController($scope, $stateParams, $state, PortfolioService, DBService) {
	$scope.userPortfolios = DBService.getAllPortfoliosForUser();

	var isLive = DBService.getCurrentState($state.current.name);
	$scope.currentPortfolio = DBService.getCurrentPortfolio(isLive);
	$scope.portfolioTransactions = DBService.getAllTransactionsForPortfolio($scope.currentPortfolio[0].portfolio_Id);

	$(document).ready(function(){
    	$('.collapsible').collapsible();
 	});
     
}]);
