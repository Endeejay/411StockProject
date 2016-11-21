stockApp.service('FactoryService',[function () {

this.makePortfolioObject = makePortfolioObject;
this.makeTransactionObject = makeTransactionObject;
this.makeWatchObject = makeWatchObject;
this.changeSqlArrayToPortfolioJsonObject = changeSqlArrayToPortfolioJsonObject;
this.changeSqlArrayToTransactionJsonObject = changeSqlArrayToTransactionJsonObject;
this.changeSqlArrayToWatchJsonObject = changeSqlArrayToWatchJsonObject;
this.tryCatchError = tryCatchError;
this.getCurrentStateInt = getCurrentStateInt;

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
      "exchangeName" : array[0].values[object][2],
      "exchangeShortName" : array[0].values[object][3],
      "tradeTime" : array[0].values[object][4],
      "stockValue" : array[0].values[object][5],
      "totalShares" : array[0].values[object][6],
      "totalSharesAtTransaction" : array[0].values[object][7],
      "numberOfShares" : array[0].values[object][8],
      "buyOrSell" : array[0].values[object][9],
      "currencyAtTransaction" : array[0].values[object][10]
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

function makeTransactionObject(portfolioId, exchangeName, excahangeShortName, tradeTime, stockValue, totalShares, totalSharesAtTransaction, numberOfShares, buyOrSell, currencyAtTransaction){
  var transaction = {
    "portfolioId" : portfolioId,
    "exchangeName": exchangeName,
    "exchangeShortName": excahangeShortName,
    "tradeTime" : tradeTime,
    "stockValue" : stockValue,
    "totalShares": totalShares,
    "totalSharesAtTransaction" : totalSharesAtTransaction,
    "numberOfShares" : numberOfShares,
    "buyOrSell" : buyOrSell,
    "currencyAtTransaction" : currencyAtTransaction
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
