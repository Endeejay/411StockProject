stockApp.service('FactoryService',[function () {

this.makePortfolioObject = makePortfolioObject;
this.makeTransactionObject = makeTransactionObject;
this.makeWatchObject = makeWatchObject;
this.changeSqlArrayToPortfolioJsonObject = changeSqlArrayToPortfolioJsonObject;
this.changeSqlArrayToTransactionJsonObject = changeSqlArrayToTransactionJsonObject;
this.changeSqlArrayToWatchJsonObject = changeSqlArrayToWatchJsonObject;
this.tryCatchError = tryCatchError;
this.getCurrentStateInt = getCurrentStateInt;
this.formatDate = formatDate;

function formatDate(date){
var month = date.getUTCMonth() + 1; //months from 1-12
var day = date.getUTCDate();
var year = date.getUTCFullYear();

return year + '/' + month + '/' + day + "";
    
}

function getCurrentStateInt(state){
  var isLive;
  var currentState= state.substr(0, state.indexOf('.'));
  if(currentState === 'live'){
    isLive = 0;
  }else{
    isLive = 1;
  }
  return isLive;
}

function changeSqlArrayToPortfolioJsonObject(array){
jsonObject = [];

for (object in array[0].values)
{
  var portfolio = {
    "portfolioId" : array[0].values[object][0],
    "portfolioName" : array[0].values[object][1],
    "isLive" : array[0].values[object][2],
    "startDate" : array[0].values[object][3],
    "endDate" : array[0].values[object][4],
    "currency" : array[0].values[object][5],
    "active" : array[0].values[object][6]
  };
  jsonObject.push(portfolio);
  }
return jsonObject;
}

function changeSqlArrayToTransactionJsonObject(array){
jsonObject = [];

  for (object in array[0].values)
  {
    var transaction = {
      "portfolioId" : array[0].values[object][1],
      "symbol" : array[0].values[object][2],
      "tradeTime" : array[0].values[object][3],
      "stockValue" : array[0].values[object][4],
      "totalShares" : array[0].values[object][5],
      "totalSharesAtTransaction" : array[0].values[object][6],
      "numberOfShares" : array[0].values[object][7],
      "buyOrSell" : array[0].values[object][8],
      "currencyAtTransaction" : array[0].values[object][9],
      "totalPrice" : array[0].values[object][10]
  };
  jsonObject.push(transaction);
  }
return jsonObject;
}

function changeSqlArrayToWatchJsonObject(array){
jsonObject = [];

  for (object in array[0].values)
  {
    var watch = {
      "portfolioId" : array[0].values[object][1],
      "symbol" : array[0].values[object][2],
      "priceWhenAdded" : array[0].values[object][3],
      "dateWhenAdded" : array[0].values[object][4]
  };
  jsonObject.push(watch);
  }
return jsonObject;
}

function makePortfolioObject(portfolioName, isLive, startDate, endDate, currency, active){
  var portfolio = {
    "portfolioName" : portfolioName,
    "isLive" : isLive,
    "startDate" : startDate,
    "endDate" : endDate,
    "currency" : currency,
    "active" : active
  };

  return portfolio;
}

function makeWatchObject(portfolioId, symbol, priceWhenAdded, dateWhenAdded){
  var watch = {
    "portfolioId" : portfolioId,
    "symbol" : symbol,
    "priceWhenAdded" : priceWhenAdded,
    "dateWhenAdded" : dateWhenAdded
  };

  return watch;
}

function makeTransactionObject(portfolioId, symbol, tradeTime, stockValue, totalShares, totalSharesAtTransaction, numberOfShares, buyOrSell, currencyAtTransaction, totalPrice){
  var transaction = {
    "portfolioId" : portfolioId,
    "symbol": symbol,
    "tradeTime" : tradeTime,
    "stockValue" : stockValue,
    "totalShares": totalShares,
    "totalSharesAtTransaction" : totalSharesAtTransaction,
    "numberOfShares" : numberOfShares,
    "buyOrSell" : buyOrSell,
    "currencyAtTransaction" : currencyAtTransaction,
    "totalPrice" : totalPrice
  };

  return transaction;
}

function tryCatchError(message){
  var errorObject = {
    "errorMessage" : message
  }
  return [errorObject];
}
}]);
