stockApp.controller('HomeController', ['$scope','$state','SQLDBService','FactoryService', function HomeController($scope, $state, SQLDBService, FactoryService) {
  $scope.message = "Home Data Page";

  /*live is 1, historic is 2*/
  var isLive;
  var currentState = $state.current.name;

  if(currentState === "live"){
    isLive = 0;
  }
  else{
    isLive = 1;
  }
  if(SQLDBService.checkIfPortfolioIdForLiveOrHistoricExists(isLive) === false){
    var portfolio = FactoryService.makePortfolioObject("name", isLive,"","",5000,1);
    SQLDBService.createPortfolio(portfolio);
  }
}]);
