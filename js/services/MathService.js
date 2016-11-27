		//percentage and dollar amount
	//calculate the TAL library values for the individual stocks
//MULTIPLE STOCK FUNCTIONS
	//total amount for all stocks
		//this will run everytime the page refreshes to get the newest info
		//this is the amount that will be added to currency
		//just a gather of the single amount functions
	//total difference
	//historic calculations need to include our final price and initial price already, since they
	//do not have to be figured out on the fly
stockApp.service('MathService',['SQLDBService',function (SQLDBService) {

this.stockTotal = stockTotal;
this.netDiffPercent = netDiffPercent;
this.netDiffDollars = netDiffDollars;
this.allStockTotals = allStockTotals;
this.allStockDiffPercent = allStockDiffPercent;
this.allStockDiffDollars = allStockDiffDollars;
this.getMostRecentStockPrice = getMostRecentStockPrice;
this.checkCurrencyEnoughForPurchase = checkCurrencyEnoughForPurchase;
this.totalTransactionPrice = totalTransactionPrice;
this.calculateNewCurrencyValue = calculateNewCurrencyValue;
this.totalShareCount = totalShareCount;
this.getTotalShares = getTotalShares;



function getTotalShares(id, shortName){
	var transactionsData = SQLDBService.getTransactionsByPortfolioIdAndShortName(id, shortName);
	var shares = 0
	for(index in transactionsData){
		if(transactionsData[index].buyOrSell === 0){
			shares += transactionsData[index].numberOfShares;
		}else if(transactionsData[index].buyOrSell === 1){
			shares -= transactionsData[index].numberOfShares;
		}
	}
	return shares;
}

function totalShareCount(oldShares, newShares, isBuyOrSell){
	var newShareTotal;
	if(isBuyOrSell == 0){
		newShareTotal = oldShares + newShares;
	}else{
		newShareTotal = oldShares - newShares;
	}
	return newShareTotal;
}

function calculateNewCurrencyValue(currentCurrency, valueOfPurchase, isBuyOrSell){
	var newCurrency;
	currentCurrency = currentCurrency;
	if(isBuyOrSell == 0){
		newCurrency = currentCurrency - valueOfPurchase;
	}else{
		newCurrency = currentCurrency + valueOfPurchase;
	}
	return newCurrency;
}

function totalTransactionPrice(shares,priceOfStock){
	return shares*priceOfStock;
}

function checkCurrencyEnoughForPurchase(priceOfTransaction,currency){
	var currencyInt = currency;
	var isEnough = false;
	if (priceOfTransaction <= currencyInt){
		isEnough = true;
	}
	return isEnough;
}

function stockTotal(stockName){
	var totalValue = 0;
	//get a current price from the API
	//get shares from the portfolio based on the most recent transaction
	return totalValue = shares*price;
}

function netDiffPercent(firstPrice, secondPrice){
	var diff = secondPrice - firstPrice;
	var diffOverTotal = (firstPrice/diff)*100;
	return diffOverTotal;
}

function netDiffDollars(firstPrice,secondPrice){
	var dollarDiff = secondPrice - firstPrice;
	return dollarDiff;
}

function allStockTotals(portfolio){
	var runningTotal;
	var price = 0;
	//price is going to be the value that we are pulling from the api
	var shares = 0;
	//shares is a value that we are going to pull from the portfolio
}

function allStockDiffPercent(portfolio){
	var diff = 0;
	var diffOverTotal = 0;

}

function allStockDiffDollars(portfolio){

}

function getMostRecentStockPrice(stockObj){
	return stockObj.LastPrice;
}

}]);
