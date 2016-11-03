stockApp.service('DBService',[function () {
const storage = require('electron-json-storage');

/*These are fields*/
var portfolio = 'portfolio';
var watch = 'watch';
var transaction = 'transaction';

/*run init to make your initial jsonFiles*/
//initJsonFiles();
/*if you wanna use a function elsewhere make it look like getRelevantDataByPortfolioId */

this.getRelevantDataByPortfolioId = function (field, portfolioId){
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

function getNoPortfolioidError(){
  var errorString = "{\"error\" : \"portfolioId doesn't exist\"}"
  errorString = JSON.parse(errorString);
  return errorString;
}

function addPortfolio(portfolioName, startDate, endDate){
  var field = "portfolio"
  var currentPortfolio = get(field);
  var _portfolioId = currentPortfolio.portfolio_Id;
  var _portfolioName = currentPortfolio.portfolio_name;
  var _startDate = currentPortfolio.start_date;
  var _endDate = currentPortfolio.end_date;

  if(isNull(currentPortfolio.portfolio_Id)){
    _portfolioId = [0];
    _portfolioName =  [portfolioName];
    _startDate = [startDate];
    _endDate = [endDate];
  }
  else{
    _portfolioId.push(_portfolioId[_portfolioId.length-1] + 1);
    _portfolioName.push(portfolioName);
    _startDate.push(startDate);
    _endDate.push(endDate);
  }



  var newPortfolioJson = makePortfolioJson(_portfolioId, _portfolioName, _startDate, _endDate);
  set(field, newPortfolioJson);
}

function addWatch(portfolioId, exchangeShortName){
  var field = "watch"
  var currentWatch = get(field);
  var _portfolioId = currentWatch.portfolio_Id;
  var _exchangeShortName = currentWatch.exchange_short_name;

  if(isNull(currentWatch.portfolio_Id)){
    _portfolioId = [portfolioId];
    _exchangeShortName = [exchangeShortName];
  }
  else{
    _portfolioId.push(portfolioId);
    _exchangeShortName.push(exchangeShortName);
  }

  var newWatchJson = makeWatchJson(_portfolioId, _exchangeShortName);
  set(field, newWatchJson);
}

function addTransaction(portfolioId, exchangeName, exchangeShortName, tradeTime, stockValue, numberOfShares ){
  var field = "transaction";
  var currentTransaction = get(field);
  var _portfolioId = currentTransaction.portfolio_Id;
  var _exchangeName = currentTransaction.exchange_name;
  var _exchangeShortName = currentTransaction.exchange_short_name;
  var _tradeTime = currentTransaction.trade_time;
  var _stockValue = currentTransaction.stock_value;
  var _numberOfShares = currentTransaction.number_of_shares;

  if(isNull(currentTransaction.portfolio_Id)){
    _portfolioId = [portfolioId];
    _exchangeName = [exchangeName];
    _exchangeShortName = [exchangeShortName];
    _tradeTime = [tradeTime];
    _stockValue = [stockValue];
    _numberOfShares = [numberOfShares];
  }
  else{
    _portfolioId.push(portfolioId);
    _exchangeName.push(exchangeName);
    _exchangeShortName.push(exchangeShortName);
    _tradeTime.push(tradeTime);
    _stockValue.push(stockValue);
    _numberOfShares.push(numberOfShares);
  }

  var newTransactionJson = makeTransactionJson(_portfolioId, _exchangeName, _exchangeShortName, _tradeTime, _stockValue, _numberOfShares);
  set(field, newTransactionJson);
}

function isNull(value){
  return value === null;
}

function initJsonFiles(){
  var portfolio = makePortfolioJson(null, null, null, null);
  var watch = makeWatchJson(null, null);
  var transaction = makeTransactionJson(null, null, null, null, null, null);

  set("portfolio", portfolio);
  set("watch", watch);
  set("transaction", transaction);
}

    function makePortfolioJson(portfolioId, portfolioName, startDate, endDate){
      var portfolioJson = {
        "portfolio_Id" : portfolioId,
        "portfolio_name" : portfolioName,
        "start_date" : startDate,
        "end_date" : endDate
      };

      return portfolioJson;
    }

    function makeWatchJson(portfolioId, exchangeShortName){
      var watchJson = {
        "portfolio_Id" : portfolioId,
        "exchange_short_name" : exchangeShortName
      };

      return watchJson;
    }

    function makeTransactionJson(portfolioId, exchangeName, excahangeShortName, tradeTime, stockValue, numberOfShares){
      var transactionJson = {
        "portfolio_Id" : portfolioId,
        "exchange_name": exchangeName,
        "exchange_short_name": excahangeShortName,
        "trade_time" : tradeTime,
        "stock_value" : stockValue,
        "number_of_shares" : numberOfShares
      };

      return transactionJson;
    }


    function get(field) {
      var fs = require('fs');
      var currentUser = getUserDirective();
      var stringData = fs.readFileSync(currentUser + '\\AppData\\Roaming\\Electron\\' + field +'.json', 'utf8');
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
