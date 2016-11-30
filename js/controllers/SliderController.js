stockApp.controller('SliderController', ['$scope', '$state', 'SQLDBService', 'SliderService', 'FactoryService', function SliderController($scope, $state, SQLDBService, SliderService, FactoryService) {
	var currentPortfolio = SQLDBService.getCurrentPortfolio('historic');
	var portfolioId = currentPortfolio[0].portfolioId;
	var startDate = currentPortfolio[0].startDate;
	var endDate = currentPortfolio[0].endDate;
	var formattedStartDate = FactoryService.formatDateToMMDDYYYY(startDate);
	var formattedEndDate = FactoryService.formatDateToMMDDYYYY(endDate);


	$scope.currentDateValue = FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-")
	$scope.startingDate = formattedStartDate;
	$scope.endingDate = formattedEndDate;
	
	$scope.currentDateSet = function() {
		var currentPortfolio = SQLDBService.getCurrentPortfolio('historic');
		var currentDate = document.getElementById("currentDatePicker").value;
		var formattedCurrentDate = FactoryService.formatDatePickerDate(currentDate, "-", "/");
		var currentPortfolioDate = currentPortfolio[0].currentDate;
		var currentDisplayDate = FactoryService.formatDatePickerDate(currentPortfolioDate, "/", "-"); 
		
		if(Date.parse(formattedCurrentDate) < Date.parse(currentPortfolioDate)){
			Materialize.toast('You cannot go before your starting date!', 4000);
			document.getElementById("currentDatePicker").value = currentDisplayDate;
		}else if(Date.parse(formattedCurrentDate) > Date.parse(endDate)){
			Materialize.toast('You cannot go past your ending date!', 4000);
			document.getElementById("currentDatePicker").value = currentDisplayDate;
		}else if(Date.parse(formattedCurrentDate) === Date.parse(currentPortfolioDate)){
			Materialize.toast('That is the current date silly!', 4000);
		}else{
			Materialize.toast('You have set your current date to '+ FactoryService.formatDateToMMDDYYYY(formattedCurrentDate), 4000);
			SQLDBService.updatePortfolio(portfolioId, 'currentDate', formattedCurrentDate);
			$state.go($state.current.name);
		}	

	}
}]);