stockApp.service('DBService',[function () {
const storage = require('electron-json-storage');

//initJsonFiles();
/*if you wanna use a function elsewhere make it look like getRelevantDataByPortfolioId */

//***Function Mappings***//
this.getRelevantDataByPortfolioId = getRelevantDataByPortfolioId;
this.initializeDBAtTheBeginningOfStockApp = initializeDBAtTheBeginningOfStockApp;
this.addPortfolio = addPortfolio;
this.addTransaction = addTransaction;
this.addWatch = addWatch;
this.getAllPortfoliosForUser = getAllPortfoliosForUser;
this.getAllWatchForPortfolio = getAllWatchForPortfolio;
this.getAllTransactionsForPortfolio = getAllTransactionsForPortfolio;
this.getMostRecentTransaction = getMostRecentTransaction;
this.isPortfolioNull = isPortfolioNull;
this.checkIfPortfolioIdForLiveOrHistoricExists = checkIfPortfolioIdForLiveOrHistoricExists;
this.getCurrentPortfolio = getCurrentPortfolio;
this.getPortfolioById = getPortfolioById;
this.setPortfolioValues = setPortfolioValues;
this.getCurrentState = getCurrentState;
this.getTotalShares = getTotalShares;
this.setTransactionValues = setTransactionValues;

function getCurrentState(state){
  var isLive;
  var currentState= state.substr(0, state.indexOf('.')); 
  if(currentState === 'live'){
    isLive = 1;
  }else{
    isLive = 2;
  }
  return isLive;
}

function getMostRecentTransaction(portfolioId, shortName){
  var data = getJsonArray("transaction");
  var info = [];
  var jsonInfo = [];

  for(index in data){
    if(data[index].portfolio_Id == portfolioId){
      if(data[index].exchange_short_name == shortName){
        info.push(data[index]);      
      }
    }
  }
  jsonInfo.push(info[info.length - 1])

  return jsonInfo;
}

function getTotalShares(portfolioId, exchangeShortName){
  var data = getJsonArray("transaction");
  var totalBuyShares = 0;
  var totalSellShares = 0;
  for(index in data){
    if(data[index].portfolio_Id == portfolioId){
      if(data[index].exchange_short_name == exchangeShortName){
        if(data[index].buy_or_sell == 1){
          var shares = parseInt(data[index].number_of_shares);
          totalBuyShares += shares;
        }else if(data[index].buy_or_sell == 2){
          var shares = parseInt(data[index].number_of_shares);
          totalSellShares += shares;
        }else{

        }
      }
    } 
  }
  return totalBuyShares-totalSellShares;
}

function setTransactionValues(Id, exchangeShortName, objectField, value){
  var data = getJsonArray("transaction");
  var portfolioId = [];
  var exchangeName = [];
  var exchangeShortName = [];
  var tradeTime = [];
  var stockValue = [];
  var totalShares = [];
  var totalSharesAtTransaction = [];
  var numberOfShares = [];
  var buyOrSell = [];
  var currencyAtTransaction = [];

  for(index in data){
    if(data[index].portfolio_Id == id){
      if(data[index].exchange_short_name == exchangeShortName){
        data[index][objectField] = value;
      }
    }
    
      portfolioId.push(data[index].portfolio_Id);
      exchangeName.push(data[index].exchange_name);
      exchangeShortName.push(data[index].exchange_short_name);
      tradeTime.push(data[index].trade_time);
      stockValue.push(data[index].stock_value);
      totalShares.push(data[index].total_shares);
      totalSharesAtTransaction.push(data[index].total_shares_at_transaction);
      numberOfShares.push(data[index].number_of_shares);
      buyOrSell.push(data[index].buy_or_sell);
      currencyAtTransaction.push(data[index].currency_at_transaction);
  }
  var newTransactionJson = makeTransactionJson(portfolioId, exchangeName, exchangeShortName, tradeTime, stockValue, totalShares, totalSharesAtTransaction, numberOfShares, buyOrSell, currencyAtTransaction);
  set("transaction", newTransactionJson);
}

function setPortfolioValues(id, objectField, value){
  var data = getJsonArray("portfolio");
  var portfolioId = [];
  var portfolioName = [];
  var isLive = [];
  var startDate = [];
  var endDate = [];
  var currency = [];

  for(index in data){
    if(data[index].portfolio_Id == id){
      data[index][objectField] = value;
    }
    
      portfolioId.push(data[index].portfolio_Id);
      portfolioName.push(data[index].portfolio_name);
      isLive.push(data[index].is_live);
      startDate.push(data[index].start_date);
      endDate.push(data[index].end_date);
      currency.push(data[index].currency);
  }
  var newPortfolioJson = makePortfolioJson(portfolioId, portfolioName, isLive, startDate, endDate, currency);
  set("portfolio", newPortfolioJson);
}

function getCurrentPortfolio(state){
  var data = getJsonArray("portfolio");
  var stateJsonInfo = [];
  var jsonInfo = [];
  for(index in data){
    if(data[index].is_live == state){
      stateJsonInfo.push(data[index]);
    }
  }
  jsonInfo.push(stateJsonInfo[stateJsonInfo.length - 1])

  return jsonInfo;

}

function getPortfolioById(portfolioId){
  var data = getJsonArray("portfolio");
  var errorString = getNoPortfolioidError();
  var jsonInfo = [];

  for(index in data){
    if(data[index].portfolio_Id == portfolioId){
      jsonInfo.push(data[index])
    }
  }
  if(jsonInfo.length == 0)
  {
    jsonInfo.push(errorString);
  }

  return jsonInfo;
}

function checkIfPortfolioIdForLiveOrHistoricExists(isLive){
  var data = getJsonArray("portfolio");
  var doesLiveExist = false;
  for (index in data){
    if(data[index].is_live == isLive){
      doesLiveExist = true;
    }
  }

  return doesLiveExist;
}

function isPortfolioNull(){
  var data = getJsonArray("portfolio");
  return data[0].error;
}

function getRelevantDataByPortfolioId(field, portfolioId){
  var data = getJsonArray(field);
  var jsonInfo = [];
  var errorString = getNoPortfolioidError();
  for (index in data){
    if(data[index].error){
      jsonInfo.push(data[index]);
      break;
    }
    if(data[index].portfolio_Id == portfolioId){
      jsonInfo.push(data[index]);
    }
  }
  if(jsonInfo.length == 0){

      jsonInfo.push(errorString);
  }
  return jsonInfo
}

function getAllPortfoliosForUser(){
  var field = "portfolio";
  var userPortfolios = getJsonArray(field);
  return userPortfolios;
}

function getNoPortfolioidError(){
  var errorString = "{\"error\" : \"portfolioId doesn't exist\"}"
  errorString = JSON.parse(errorString);
  return errorString;
}

function addPortfolio(portfolioName, isLive, startDate, endDate, currency){
  var field = "portfolio"
  var currentPortfolio = get(field);
  var _portfolioId = currentPortfolio.portfolio_Id;
  var _portfolioName = currentPortfolio.portfolio_name;
  var _isLive = currentPortfolio.is_live;
  var _startDate = currentPortfolio.start_date;
  var _endDate = currentPortfolio.end_date;
  var _currency = currentPortfolio.currency;

  if(isNull(currentPortfolio.portfolio_Id)){
    _portfolioId = [1];
    _portfolioName =  [portfolioName];
    _isLive = [isLive];
    _startDate = [startDate];
    _endDate = [endDate];
    _currency = [currency];
  }
  else{
    _portfolioId.push(_portfolioId.length + 1);
    _portfolioName.push(portfolioName);
    _isLive.push(isLive);
    _startDate.push(startDate);
    _endDate.push(endDate);
    _currency.push(currency);
  }

  var newPortfolioJson = makePortfolioJson(_portfolioId, _portfolioName, _isLive, _startDate, _endDate, _currency);
  set(field, newPortfolioJson);
}

function getAllWatchForPortfolio(portfolioId){
  var field = "watch";
  var userWatchedStocks = getRelevantDataByPortfolioId(field, portfolioId);
  return userWatchedStocks;
}

function getAllTransactionsForPortfolio(portfolioId){
  var field = "transaction";
  var portfolioTransactions = getRelevantDataByPortfolioId(field, portfolioId);
  return portfolioTransactions;
}

function addWatch(portfolioId, symbol, priceWhenAdded, dateWhenAdded){
  var field = "watch";
  var currentWatch = get(field);
  var _portfolioId = currentWatch.portfolio_Id;
  var _symbol = currentWatch.symbol;
  var _priceWhenAdded = currentWatch.price_when_added;
  var _dateWhenAdded = currentWatch.date_when_added;

  if(isNull(currentWatch.portfolio_Id)){
    _portfolioId = [portfolioId];
    _symbol = [symbol];
    _priceWhenAdded = [priceWhenAdded];
    _dateWhenAdded = [dateWhenAdded];
  }
  else{
    _portfolioId.push(portfolioId);
    _symbol.push(symbol);
    _priceWhenAdded.push(priceWhenAdded);
    _dateWhenAdded.push(dateWhenAdded);

  }

  var newWatchJson = makeWatchJson(_portfolioId, _symbol, _priceWhenAdded, _dateWhenAdded);
  set(field, newWatchJson);
}

function addTransaction(portfolioId, exchangeName, exchangeShortName, tradeTime, stockValue, totalSharesAtTransaction, numberOfShares, buyOrSell, currencyAtTransaction){
  var field = "transaction";
  var currentTransaction = get(field);
  var _portfolioId = currentTransaction.portfolio_Id;
  var _exchangeName = currentTransaction.exchange_name;
  var _exchangeShortName = currentTransaction.exchange_short_name;
  var _tradeTime = currentTransaction.trade_time;
  var _stockValue = currentTransaction.stock_value;
  var _totalSharesAtTransaction = currentTransaction.total_shares_at_transaction;
  var _numberOfShares = currentTransaction.number_of_shares;
  var _buyOrSell = currentTransaction.buy_or_sell;
  var _currencyAtTransaction = currentTransaction.currency_at_transaction;

  if(isNull(currentTransaction.portfolio_Id)){
    _portfolioId = [portfolioId];
    _exchangeName = [exchangeName];
    _exchangeShortName = [exchangeShortName];
    _tradeTime = [tradeTime];
    _stockValue = [stockValue];
    _totalSharesAtTransaction = [totalSharesAtTransaction];
    _numberOfShares = [numberOfShares];
    _buyOrSell = [buyOrSell];
    _currencyAtTransaction = [currencyAtTransaction];
  }
  else{
    _portfolioId.push(portfolioId);
    _exchangeName.push(exchangeName);
    _exchangeShortName.push(exchangeShortName);
    _tradeTime.push(tradeTime);
    _stockValue.push(stockValue);
    _totalSharesAtTransaction.push(totalSharesAtTransaction);
    _numberOfShares.push(numberOfShares);
    _buyOrSell.push(buyOrSell);
    _currencyAtTransaction.push(currencyAtTransaction);
  }

  var newTransactionJson = makeTransactionJson(_portfolioId, _exchangeName, _exchangeShortName, _tradeTime, _stockValue, _totalSharesAtTransaction, _numberOfShares, _buyOrSell, _currencyAtTransaction);
  set(field, newTransactionJson);
}

function isNull(value){
  return value === null;
}

function initializeDBAtTheBeginningOfStockApp(){
  var portfolio = 'portfolio';
  var portfolioJson = get(portfolio);

  if(portfolioJson == false)
  {
    initJsonFiles();
  }
}

function initJsonFiles(){
  var portfolio = makePortfolioJson(null, null, null, null, null, null);
  var watch = makeWatchJson(null, null, null, null);
  var transaction = makeTransactionJson(null, null, null, null, null, null, null, null, null);

  set("portfolio", portfolio);
  set("watch", watch);
  set("transaction", transaction);
}

    function makePortfolioJson(portfolioId, portfolioName, isLive, startDate, endDate, currency){
      var portfolioJson = {
        "portfolio_Id" : portfolioId,
        "portfolio_name" : portfolioName,
        "is_live" : isLive,
        "start_date" : startDate,
        "end_date" : endDate,
        "currency" : currency
      };

      return portfolioJson;
    }

    function makeWatchJson(portfolioId, symbol, priceWhenAdded, dateWhenAdded){
      var watchJson = {
        "portfolio_Id" : portfolioId,
        "symbol" : symbol,
        "price_when_added" : priceWhenAdded,
        "date_when_added" : dateWhenAdded
      };

      return watchJson;
    }

    function makeTransactionJson(portfolioId, exchangeName, excahangeShortName, tradeTime, stockValue, totalSharesAtTransaction, numberOfShares, buyOrSell, currencyAtTransaction){
      var transactionJson = {
        "portfolio_Id" : portfolioId,
        "exchange_name": exchangeName,
        "exchange_short_name": excahangeShortName,
        "trade_time" : tradeTime,
        "stock_value" : stockValue,
        "total_shares_at_transaction" : totalSharesAtTransaction, 
        "number_of_shares" : numberOfShares,
        "buy_or_sell" : buyOrSell,
        "currency_at_transaction" : currencyAtTransaction
      };

      return transactionJson;
    }


    function get(field) {
      var fs = require('fs');
      var currentUser = getUserDirective();
      var stringData;
      var parsedJsonData;
      try{
        stringData = fs.readFileSync(currentUser + '\\AppData\\Roaming\\Electron\\' + field +'.json', 'utf8');
      } catch (err){
        return false;
      }
      var parsedJsonData = JSON.parse(stringData);

      return parsedJsonData;
    }

function getJsonArray(field){
  var jsonArrayData = get(field);
  var arrayOfJsonObjects = [];
  var jsonString;
  var lengthOfObjectArray = 1;
  for(var i = 0;i< lengthOfObjectArray; i++){
    var count = 0;
    for (property in jsonArrayData){
      if(i==0){
        if(jsonArrayData[property] == null){
          jsonString = "\"error\" : \"" + field + " is null!\""
          break;
        }
          lengthOfObjectArray = jsonArrayData[property].length
      }
      //var propertyValue = property;
      var arrayValue = jsonArrayData[property][i];

      if(count > 0){
        jsonString += ", \"" + property + "\" : " +"\""+arrayValue +"\""
      }else{
        jsonString = "\"" + property + "\" : " +"\""+ arrayValue +"\""
      }
      count++;
    }

    jsonString = "{"+ jsonString +"}";
    jsonObject = JSON.parse(jsonString);
    arrayOfJsonObjects.push(jsonObject);
    jsonString = "";
}

return arrayOfJsonObjects;
}

    function getUserDirective(){
      var directoryString = __dirname;
      var returnString = "";
      var index = 0;
      for(var i = 0; i < directoryString.length; i++)
      {
        if(directoryString[i] === '\\')
        {
          index++;
        }
        returnString += directoryString[i];
         if(index == 3)
         {
           return returnString;
         }
      }
    }

    function set(field, object) {
      storage.set(field, object ,function(error){
        if(error) throw error;
      });
    }
/*has checks if the Field is in the DB.... Field = */
    function has(field){
      storage.has(field, function(error,hasKey){
        if(error) throw error;
        if(hasKey){
          return true;
        }
        else{
        return false;
        }
      });
    }

    function keys(table){
      storage.keys(function(error, keys) {
        if (error) throw error;
        for (var key of keys) {
          console.log('There is a key called: ' + key);
          console.log('table' + table);
          if(key == table){
            return true;
          }
        }
      });
    }

    function remove(field){
      storage.remove(field, function(error) {
        if (error) throw error;
      });
    }

    function clear(){
      storage.clear(function(error){
        if(error) throw error;
      });
    }
}]);
