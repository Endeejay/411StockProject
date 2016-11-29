stockApp.service('YahooService', [function () {

this.getAStock = getAStock;
this.getAllStocks = getAllStocks;



var yahooFinance = require('yahoo-finance');
// var SYMBOL = 'AAPL';
// var firstDate = '2012-01-01';
// var secondDate = '2012-12-31';
// var util = require('util');

function getAStock (symbol, startDate, endDate, callBackFunction) {
	return yahooFinance.historical({
		symbol: symbol,
		from: startDate,
		to: endDate,
		// period: 'd'
	})
}

function getAllStocks (symbols, startDate, endDate, callBackFunction) {
	yahooFinance.historical({
		symbols: symbols,
		from: startDate,
		to: endDate,
		period: 'd'
	}).then(function(quotes){
		callBackFunction(quotes);
	});
}
}]);
