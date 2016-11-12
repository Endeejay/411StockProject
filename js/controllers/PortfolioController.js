stockApp.controller('PortfolioController', ['$scope', 'PortfolioService', 'DBService', function PortfolioController($scope, PortfolioService, DBService) {
	$scope.userPortfolios = DBService.getAllPortfoliosForUser();


	$scope.createPortfolio = function(){
		$scope.userPortfolios.push(DBService.addPortfolio('new', 'now', 'never'));
	}

	//only removes from the ui currently
	$scope.removePortfolio = function(portfolioId){
		var index = $scope.userPortfolios.findIndex(p => p.portfolio_Id == portfolioId);
		$scope.userPortfolios.splice(index, 1);
	}

}]);
