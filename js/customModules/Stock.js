var fs = require("fs");
var content = fs.readFileSync('../411StockProject/db/TestDataFixed.json','utf8');
var jsonContent = JSON.parse(content);
//getting our stock names

function getName(theData) {
	return theData.Name;
}
//getting the stock symbols
function getSymbol(theData) {
	return theData.Symbol;
}
//getting dates
function getDates(theData) {
	return theData.Dates;
}
//getting prices
function getPrices(theData) {
	return theData.Prices;
}

module.exports = {
	getAllStockNamez: function() {
		var names = []
		jsonContent.forEach(function(item) {
			names.push(getName(item));
		})
	return names;
	},
	getAllStockSymbols: function() {
		var symbols = []
		jsonContent.forEach(function(item) {
			symbols.push(getSymbol(item));
		})
	return symbols;
	},
//The next two functions are going to return arrays of arrays
//The contents of these arrays are also backwards, so they have to be fixed
//in the MakeChart.js to make them in the proper order
	getAllPrices: function() {
		var prices = []
		jsonContent.forEach(function(item){
			prices.push(getPrices(item));
		})
	return prices;
	},
	getAllDates: function() {
		var dates = []
		jsonContent.forEach(function(item){
			dates.push(getPrices(item));
		})
	return dates;
	}
};
