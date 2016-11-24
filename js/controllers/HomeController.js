var parseString = require('xml2js').parseString;
const shell = require('electron').shell;
stockApp.controller('HomeController', ['$scope','$state','SQLDBService','FactoryService', 'APIService', function HomeController($scope, $state, SQLDBService, FactoryService, APIService) {
  $scope.message = "Home Data Page";

  /*live is 1, historic is 2*/
  var isLive;
  var currentState = $state.current.name;

  if(currentState === "live"){
    getRssFeed();

    function getRssFeed(){
      APIService.getRssFeed().then(function(data){
        parseString(data.data, function (err, result) {
          console.log(result.rss.channel[0].item);
          $scope.rssFeed = result.rss.channel[0].item;
        });
      });

    $(document).ready(function(){
      $('.carousel').carousel();
    });
    
    }
    
    isLive = 0;
  }
  else{
    isLive = 1;
  }

  $scope.openPageInBrowser = function(link){
    shell.openExternal(link);
  };

  if(SQLDBService.checkIfPortfolioIdForLiveOrHistoricExists(isLive) === false){
    var portfolio = FactoryService.makePortfolioObject("name", isLive,"","",5000,1);
    SQLDBService.createPortfolio(portfolio);
  }


}]);
