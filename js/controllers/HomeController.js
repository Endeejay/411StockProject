stockApp.controller('HomeController', ['$scope','$state','DBService', function HomeController($scope, $state, DBService) {
  $scope.message = "Home Data Page";

  /*live is 1, historic is 2*/
  var isLive;
  var currentState = $state.current.name;

  if(currentState === "live"){
    isLive = 1;
  }
  else{
    isLive = 2;
  }
  if(DBService.isPortfolioNull()){
    DBService.addPortfolio("", isLive, null, null, 5000);
  }
  else if(DBService.checkIfPortfolioIdForLiveOrHistoricExists(isLive) === false){
    DBService.addPortfolio("", isLive, null, null, 5000);
  }
  else{
    //ask if you want to start a new session
  }
}]);
