var parseString = require('xml2js').parseString;
const shell = require('electron').shell;
stockApp.controller('HomeController', ['$scope','$state','SQLDBService', 'FactoryService', 'APIService', function HomeController($scope, $state, SQLDBService, FactoryService, APIService) {
  $scope.message = "Home Data Page";

  /*live is 0, historic is 1*/
  var isLive;
  var currentState = $state.current.name;

  if(currentState === "live"){
    isLive = 0;
    getRssFeed(currentState);
  }
  else{
    isLive = 1;
  }

  function getRssFeed(state){
    var portfolioId = SQLDBService.getCurrentPortfolio(state)[0].portfolioId;
    
    var watch = SQLDBService.getWatchByPortfolioId(portfolioId);

    if(watch.length > 0 && watch[0].symbol){
      APIService.getRssFeedFromWatch(watch).then(function(data){
        parseString(data.data, function (err, result){
          $scope.rssFeed = result.rss.channel[0].item;
        });
      });
    }else{
      APIService.getRssFeed().then(function(data){
        parseString(data.data, function (err, result) {
          $scope.rssFeed = result.rss.channel[0].item;
        });
      });
    }
  }

  $scope.openPageInBrowser = function(link){
    shell.openExternal(link);
  };

  if(SQLDBService.checkIfPortfolioIdForLiveOrHistoricExists(isLive) === false){
    var portfolio = FactoryService.makePortfolioObject("name", isLive, "", "", "", 5000, 1);
    SQLDBService.createPortfolio(portfolio);
  }


}]);
