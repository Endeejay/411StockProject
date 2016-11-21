stockApp.controller('PortfolioController', ['$scope', '$stateParams', '$state', 'PortfolioService', 'SQLDBService','FactoryService', function PortfolioController($scope, $stateParams, $state, PortfolioService, SQLDBService, FactoryService) {
	$scope.userPortfolios = SQLDBService.getPortfolios();

	var state = $state.current.name
	var currentStateString = state.substr(0, state.indexOf('.'));
//since we are just getting them all by ID the getCurrentPortfolio is not needed
//when one of those buttons is clicked, the id is based on the button
//then push the ID into getTransactionsByPortfolioId
//-Tay Tay 
	$scope.currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
	$scope.portfolioTransactions = SQLDBService.getTransactionsByPortfolioId($scope.currentPortfolio[0].portfolioId);
	$(document).ready(function(){
    	$('.collapsible').collapsible();
 	});

}]);
