stockApp.controller('SliderController', ['$scope', '$state', 'SQLDBService', 'SliderService', function SliderController($scope, $state, SQLDBService, SliderService) {
	var currentPortfolio = SQLDBService.getCurrentPortfolio('historic');
	var startDate = currentPortfolio[0].startDate;
	var endDate = currentPortfolio[0].endDate;
	
/*
Use these dates to set min max for date picker
user picks new date
set that date to new min
need button to set date
add toast to alert that new date was set
*/
	



}]);