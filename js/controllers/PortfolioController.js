stockApp.controller('PortfolioController', ['$scope', '$stateParams', '$state', 'PortfolioService', 'SQLDBService','FactoryService', function PortfolioController($scope, $stateParams, $state, PortfolioService, SQLDBService, FactoryService) {
	$scope.userPortfolios = SQLDBService.getPortfolios();

	var state = $state.current.name
	var currentStateString = state.substr(0, state.indexOf('.'));
	var isLive = FactoryService.getCurrentStateInt(state);
	$scope.portfolioState = currentStateString;
	$scope.currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);

	$(document).ready(function(){
    	$('.collapsible').collapsible();
 	});

	$scope.portfolioButton = function(){
		$scope.portfolioTransactions = SQLDBService.getTransactionsByPortfolioId(this.portfolio.portfolioId);
		//if the transaction was a purchase, we need to display the total as a negative amount.
	    for(index in $scope.portfolioTransactions){
			if($scope.portfolioTransactions[index].buyOrSell == 0) {
				$scope.portfolioTransactions[index].totalPrice = ($scope.portfolioTransactions[index].totalPrice)*-1;
			}
			else {
				$scope.portfolioTransactions[index].totalPrice = "+" + $scope.portfolioTransactions[index].totalPrice;
			}
		}
	}

	$scope.createPortfolio = function(){
		var portfolio = FactoryService.makePortfolioObject("name", isLive,"","",5000,1);
    	SQLDBService.createPortfolio(portfolio);
		$scope.userPortfolios = SQLDBService.getPortfolios();
		if($state.is('historic.portfolio')){
    		$state.go('datePicker');
    	}
	}

}]);
