stockApp.controller('UserController', ['$scope', 'UserService', '$state', 'SQLDBService', 'FactoryService', function UserController($scope, UserService, $state, SQLDBService, FactoryService) {
	if(SQLDBService.checkIfPortfolioIdForLiveOrHistoricExists(1) === false){
    $state.go('datePicker');
  }
  
}]);
