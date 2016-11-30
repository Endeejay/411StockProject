stockApp.controller('DatePickerController', ['$scope','$state', 'SQLDBService', 'FactoryService', function BuySellController($scope, $state, SQLDBService, FactoryService) {

	$scope.onClick = function() {
		var startDate = document.getElementById("startDate").value;
		var endDate = document.getElementById("endDate").value;

		if(startDate && endDate){
			if(Date.parse(endDate) > Date.parse(startDate)){
				startDate = FactoryService.formatDatePickerDate(startDate, "-", "/");
				endDate = FactoryService.formatDatePickerDate(endDate, "-", "/");

		    	var portfolio = FactoryService.makePortfolioObject("name", 1, startDate, endDate, startDate, 5000, 1);
		    	SQLDBService.createPortfolio(portfolio);
		    	$state.go('historic.portfolio');
	    	}else{
	    		Materialize.toast('Time doesn\'t travel backwards!', 4000);
	    	}
	  	}else{
	  		Materialize.toast('You need two dates to enter historic!', 4000);
	  	}
	}

	 $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });
}]);