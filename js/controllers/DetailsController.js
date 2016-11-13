
stockApp.controller('DetailsController', function DetailsController($scope, $stateParams, $state, DBService, APIService, MathService) {
    if($stateParams.stockObj == null){
    	if($state.is('live.buy_sell.details')){
    		$state.go('live.buy_sell');
    	}
    	else{
    		$state.go('historic.buy_sell');
    	}
    }
    var stockObj = $stateParams.stockObj;
    $scope.stockReal = {};
    getStock(); 

    function getStock(){
        APIService.getSingleStock(stockObj.Symbol).then(function(data){
            $scope.stockReal = data.data[0];
            console.log($scope.stockReal.LastPrice);
        })
    }

    $scope.buyStock = function(){
        var sharesInput = document.getElementById("sharesBuy").value;
        sharesInput = parseInt(sharesInput);
        var isLive = DBService.getCurrentState($state.current.name);
        var currentPrice = MathService.getMostRecentStockPrice(stockObj);
        var currentPortfolio = DBService.getCurrentPortfolio(isLive);
       
        if(checkTransactionForEnoughCurrency(sharesInput,currentPrice,currentPortfolio[0].currency)){
            buyOrSellStock(1,sharesInput);
        }else{
            alert("You broke Slim Bandito");
        } 
    }

    $scope.sellStock = function(){
        var sharesInput = document.getElementById("sharesBuy").value;
        sharesInput = parseInt(sharesInput);
        var isLive = DBService.getCurrentState($state.current.name);
        var currentPrice = MathService.getMostRecentStockPrice(stockObj);
        var currentPortfolio = DBService.getCurrentPortfolio(isLive);

        if(checkIfStockIsBought(currentPortfolio, stockObj.Symbol, sharesInput)){
            buyOrSellStock(2,sharesInput);
        }else{
            alert("You can't sell things you don't own Slim Bandito");
        } 
        
    }

    $scope.watchStock = function(){
        console.log("Started watching " + stockObj.Symbol);
    }

    function buyOrSellStock(buyOrSell, amountOfShares){
        //fix this shit
        var isLive = DBService.getCurrentState($state.current.name);
        var currentPortfolio = DBService.getCurrentPortfolio(isLive);
        var currentPrice = MathService.getMostRecentStockPrice(stockObj);
        var totalSharesAtTransaction = DBService.getTotalShares(currentPortfolio[0].portfolio_Id, stockObj.Symbol);
        //this only works in live, we need to figure out date for historic
        var date;
        if (isLive = 1){
            date = new Date();
        }else{
            //figure out date for histoic state
            date = new Date();
        }
        
        DBService.addTransaction(currentPortfolio[0].portfolio_Id,stockObj.Name,stockObj.Symbol,date,currentPrice,totalSharesAtTransaction,amountOfShares,buyOrSell,currentPortfolio[0].currency);
        var totalTransactionPrice = MathService.totalTransactionPrice(amountOfShares, currentPrice);
        var isBuyOrSell = buyOrSell;
        var newCurrency = MathService.calculateNewCurrencyValue(currentPortfolio[0].currency,totalTransactionPrice,isBuyOrSell);
    
        DBService.setPortfolioValues(currentPortfolio[0].portfolio_Id,"currency",newCurrency);
        
    }

    function checkTransactionForEnoughCurrency(shares, priceOfStock, currentCurrency){
        var totalTransactionPrice = MathService.totalTransactionPrice(shares, priceOfStock);
        var isEnough = MathService.checkCurrencyEnoughForPurchase(totalTransactionPrice, currentCurrency);
        return isEnough;
    }

    function checkIfStockIsBought(currentPortfolio, stockSymbol, amountWantedToSell){
        var haveEnoughShares;
        var totalSharesAtTransaction = DBService.getTotalShares(currentPortfolio[0].portfolio_Id, stockSymbol);

        if(totalSharesAtTransaction >= amountWantedToSell){
            haveEnoughShares = true;
        }else{
            haveEnoughShares = false;
        }
        return haveEnoughShares;
    }
});