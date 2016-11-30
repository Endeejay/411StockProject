stockApp.controller('PortfolioController', ['$scope', '$stateParams', '$state', 'PortfolioService', 'SQLDBService','FactoryService', 'YahooService', 'APIService', function PortfolioController($scope, $stateParams, $state, PortfolioService, SQLDBService, FactoryService, YahooService, APIService) {
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
		$scope.portfolioValue = 0;
		$scope.currentPriceArray = [];
		$scope.portfolioTransactions = SQLDBService.getTransactionsByPortfolioId(this.portfolio.portfolioId);
		//if the transaction was a purchase, we need to display the total as a negative amount.
	    for(index in $scope.portfolioTransactions){
			if($scope.portfolioTransactions[index].buyOrSell == 0) {
				$scope.portfolioTransactions[index].totalPrice = ($scope.portfolioTransactions[index].totalPrice)*-1;
			}
			else {
				$scope.portfolioTransactions[index].totalPrice = "+" + $scope.portfolioTransactions[index].totalPrice;
			}

			//////////////////////////////////////////////////////////////////

			//calculate portfolio value

			var shares = $scope.portfolioTransactions[index].numberOfShares;
			var symbol = $scope.portfolioTransactions[index].symbol;

			//Live
			if($scope.currentPortfolio[0].isLive == 0)
			{
				if($scope.portfolioTransactions[index].buyOrSell == 0){
					APIService.getSingleStock(symbol).then(function(data){
						var shares = $scope.portfolioTransactions[index].numberOfShares;
						var currentPrice = data.data[0].LastPrice;
						setPortfolioValue(shares * currentPrice, index);
					});
				}
			}
			else if($scope.currentPortfolio[0].isLive == 1){

				if($scope.portfolioTransactions[index].buyOrSell == 0){
					var getStartDate1 = new Date(FactoryService.formatDatePickerDate($scope.currentPortfolio[0].currentDate, "/", "-"));
					var startDate = FactoryService.getDateMinusOneDay(getStartDate1);

					var getEndDate1 = new Date(FactoryService.formatDatePickerDate($scope.currentPortfolio[0].currentDate, "/", "-"));
					var endDate = FactoryService.formatDateForYahoo(getEndDate1);


					YahooService.getAStock(symbol, startDate, endDate).then(function(data){
						$scope.$apply(function() {
							var shares = $scope.portfolioTransactions[index].numberOfShares;
							var currentPrice = data[data.length-1].adjClose;
							setPortfolioValue(shares * currentPrice, index);
						})
					});
				}
			}
		}
	}

	$scope.createPortfolio = function(){
		if($state.is('historic.portfolio')){
    		$state.go('datePicker');
    	}
		else{
			var portfolio = FactoryService.makePortfolioObject("name", isLive,"","", "",5000,1);
			SQLDBService.createPortfolio(portfolio);
			$scope.userPortfolios = SQLDBService.getPortfolios();
		}
	}

	function setPortfolioValue(value, index){
		$scope.portfolioValue += value;
		if(index == $scope.portfolioTransactions.length-1)
		{

			$scope.portfolioValue += $scope.portfolioTransactions[index].portfolioBalance
		}
	}

}]);
