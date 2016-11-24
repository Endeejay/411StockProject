var parseString = require('xml2js').parseString;
const shell = require('electron').shell;
stockApp.controller('HomeController', ['$scope','$state','SQLDBService', 'FactoryService', 'APIService', 'DBService', function HomeController($scope, $state, SQLDBService, FactoryService, APIService, DBService) {
  $scope.message = "Home Data Page";

  /*live is 1, historic is 2*/
  var isLive;
  var currentState = $state.current.name;

  if(currentState === "live"){
    isLive = 0;
    getRssFeed();
  }
  else{
    isLive = 1;
  }

  function getRssFeed(){
    var portfolioId = DBService.getCurrentPortfolio().portfolioId;
    
    var watch = SQLDBService.getWatchByPortfolioId(portfolioId);

    if(watch.length > 0){
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

    $(document).ready(function(){
      $('.carousel').carousel();
    });
    
  }

  $scope.openPageInBrowser = function(link){
    shell.openExternal(link);
  };

  if(SQLDBService.checkIfPortfolioIdForLiveOrHistoricExists(isLive) === false){
    var portfolio = FactoryService.makePortfolioObject("name", isLive,"","",5000,1);
    SQLDBService.createPortfolio(portfolio);
  }


}]);
