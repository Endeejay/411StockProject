
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
    $scope.stockObj = stockObj;
    $scope.stockReal = {};
    getStock(); 

    //get the current price before performing functions so the user knows current price
    var currentPrice = MathService.getMostRecentStockPrice(stockObj);
    $scope.currentPrice = currentPrice;

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
            if (sharesInput == 1){
              Materialize.toast('Successfully purchased ' + sharesInput + ' share of ' + stockObj.Symbol, 4000);
            }
            else if (sharesInput > 1){
              Materialize.toast('Successfully purchased ' + sharesInput + ' shares of ' + stockObj.Symbol, 4000);
            }
        }else{
            if (isNaN(sharesInput)) {
                Materialize.toast('Please enter a number of shares to purchase.', 4000);
            }
            else {
                Materialize.toast("You don't have enough money for this!", 4000);
            }
        } 
    }

    $scope.sellStock = function(){
        var sharesInput = document.getElementById("sharesSell").value;
        sharesInput = parseInt(sharesInput);
        var isLive = DBService.getCurrentState($state.current.name);
        var currentPrice = MathService.getMostRecentStockPrice(stockObj);
        var currentPortfolio = DBService.getCurrentPortfolio(isLive);

        $scope.currentPrice = currentPrice;

        if(checkIfStockIsBought(currentPortfolio, stockObj.Symbol, sharesInput)){
            buyOrSellStock(2,sharesInput);
            if (sharesInput == 1){
              Materialize.toast('Successfully sold ' + sharesInput + ' share of ' + stockObj.Symbol, 4000);
            }
            else if (sharesInput >= 1){
              Materialize.toast('Successfully sold ' + sharesInput + ' shares of ' + stockObj.Symbol, 4000);
            }
        }else{
            if (isNaN(sharesInput)) {
                Materialize.toast('Please enter a number of shares to sell.', 4000);
            }
            else {
                Materialize.toast("You can't sell things you don't own.", 4000);
            }
        } 
        
    }

    $scope.watchStock = function(){
        Materialize.toast("Started watching " + stockObj.Symbol, 4000);
        // var currentPortfolio = DBService.getCurrentPortfolio();
        // var currentPortfolioId = currentPortfolio[0].portfolio_Id;
        // DBService.addWatch(currentPortfolioId, stockObj.Symbol);
    }

    function buyOrSellStock(buyOrSell, amountOfShares){
        //fix this shit
        var isLive = DBService.getCurrentState($state.current.name);
        var currentPortfolio = DBService.getCurrentPortfolio(isLive);
        var currentPrice = MathService.getMostRecentStockPrice(stockObj);
        var totalSharesAtTransaction = DBService.getTotalShares(currentPortfolio[0].portfolio_Id, stockObj.Symbol);
        var totalSharesAfterTransaction = getTotalSharesAfterTransaction(totalSharesAtTransaction, amountOfShares, buyOrSell);
        //this only works in live, we need to figure out date for historic
        var date;
        if (isLive == 1){
            date = new Date();
        }else{
            //figure out date for histoic state
            date = new Date();
        }
        
        DBService.addTransaction(currentPortfolio[0].portfolio_Id, stockObj.Name, stockObj.Symbol, date, currentPrice, totalSharesAfterTransaction, amountOfShares, buyOrSell, currentPortfolio[0].currency);
        var totalTransactionPrice = MathService.totalTransactionPrice(amountOfShares, currentPrice);
        var newCurrency = MathService.calculateNewCurrencyValue(currentPortfolio[0].currency, totalTransactionPrice, buyOrSell);
    
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

    function getTotalSharesAfterTransaction(currentShares, sharesAtTransaction, buyOrSell){
        var totalSharesAfterTransaction = 0;
        if(buyOrSell == 1){
            totalSharesAfterTransaction = currentShares + sharesAtTransaction;
        }else{
            totalSharesAfterTransaction = currentShares - sharesAtTransaction;
        }
        return totalSharesAfterTransaction;
    }
});