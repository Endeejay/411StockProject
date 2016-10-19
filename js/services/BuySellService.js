stockApp.service('BuySellService', [function () {

// var StockData = require('../js/customModules/Stock.js');
// StockData.getAllStockSymbols();
// var namez = StockData.getAllStockNamez().toString();
// console.log(namez);

    function getTestData() {
      var fs = require("fs");
      var stringOfData = fs.readFileSync('./db/TestData.json', 'utf8');
      return JSON.parse(stringOfData);
    }

    // function getStockName(){
    //   return StockData.getAllStockNamez
    // }

    function newPrice(arr, index){
      var exName = arr[index]["ExchangeName"];
      var open = arr[index]["Open"];
      var close = arr[index]["Close"];

      ExchangeName = exName;
      Open = open;
      Close = close;
    }

    return {
      'getTestData' : getTestData,
      'newPrice' : newPrice
    };
}]);
