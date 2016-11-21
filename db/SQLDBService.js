stockApp.service('SQLDBService', ["FactoryService", function(FactoryService){
	const sql = require('../node_modules/sql.js/js/sql.js');
	const fs = require('fs');
	const path = require('path');

	//should use electron json storage to save the db in order to have better response time
	const filebuffer = fs.readFileSync('db/electronTrader.sqlite');

	if (filebuffer != null) {
		var db = new SQL.Database(filebuffer);
	} else {
		var db = new SQL.Database();
	}
	/***Function Mappings***/
	this.initDb = initDb;
	this.createPortfolio = createPortfolio;
	this.createTransaction = createTransaction;
	this.createWatch = createWatch;
	this.getTransactionsByPortfolioId = getTransactionsByPortfolioId;
	this.getTransactionsByPortfolioIdAndShortName = getTransactionsByPortfolioIdAndShortName;
	this.getWatchByPortfolioId = getWatchByPortfolioId;
	this.getPortfolios = getPortfolios;
	this.getTransactions = getTransactions;
	this.getWatch = getWatch;
	this.getMostRecentTransaction = getMostRecentTransaction;
	this.checkIfPortfolioIdForLiveOrHistoricExists = checkIfPortfolioIdForLiveOrHistoricExists;
	this.getCurrentPortfolio = getCurrentPortfolio;
	this.getPortfolioById = getPortfolioById;
	this.updatePortfolio = updatePortfolio;
	this.setTransactionTotalShares = setTransactionTotalShares;
	this.clearDB = clearDB;

	function initDb(){
		try {
			db.run("CREATE TABLE IF NOT EXISTS portfolio (id INTEGER PRIMARY KEY UNIQUE, portfolioName TEXT, isLive INT, startDate TEXT, endDate TEXT, currency INT, active INT)");
			db.run("CREATE TABLE IF NOT EXISTS watch (id INTEGER PRIMARY KEY UNIQUE, portfolioId INT, symbol TEXT, priceWhenAdded INT, DateWhenAdded INT,FOREIGN KEY(portfolioId) REFERENCES portfolio(id))");
			db.run("CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY UNIQUE, portfolioId INT, exchangeName TEXT, exchangeShortName TEXT, tradeTime TEXT,stockValue INT, totalShares INT, totalSharesAtTransaction INT, numberOfShares INT, buyOrSell INT, currencyAtTransaction INT, FOREIGN KEY(portfolioId) REFERENCES portfolio(id))");
		} catch (e) {
			console.log(e);
		}
	}

	function createPortfolio(portfolio){
		try{
			var stmt = db.prepare("INSERT INTO portfolio (portfolioName, isLive, startDate, endDate, currency, active) VALUES(:portfolioName, :isLive, :startDate, :endDate, :currency, :active)");
			stmt.run([portfolio.portfolioName, portfolio.isLive, portfolio.startDate, portfolio.endDate, portfolio.currency, portfolio.active]);
			saveDb();
		}catch(e){
			console.error(e);
		}
	}

	function createTransaction(transaction){
		try{
			var stmt = db.prepare("INSERT INTO transactions (portfolioId, exchangeName, exchangeShortName, tradeTime, stockValue, totalShares, totalSharesAtTransaction, numberOfShares, buyOrSell, currencyAtTransaction) VALUES(:portfolioId, :exchangeName, :exchangeShortName, :tradeTime, :stockValue, :totalShares, :totalSharesAtTransaction, :numberOfShares, :buyOrSell, :currencyAtTransaction)");
			stmt.run([transaction.portfolioId, transaction.exchangeName, transaction.exchangeShortName, transaction.tradeTime, transaction.stockValue, transaction.totalShares, transaction.totalSharesAtTransaction, transaction.numberOfShares, transaction.buyOrSell, transaction.currencyAtTransaction]);
			saveDb();
		}catch(e){
			console.error(e);
		}
	}

	function createWatch(watch){
		try{
			var stmt = db.prepare("INSERT INTO watch (portfolioId, symbol, priceWhenAdded, dateWhenAdded) VALUES(:portfolioId, :symbol, :priceWhenAdded, :dateWhenAdded)");
			stmt.run([watch.portfolioId, watch.symbol, watch.priceWhenAdded, watch.dateWhenAdded]);
			saveDb();
		}catch(e){
			console.error(e);
		}
	}

	function getPortfolios(){
		var portfolioJsons;
		try{
			var rows = db.exec("SELECT * FROM portfolio");
			portfolioJsons = FactoryService.changeSqlArrayToPortfolioJsonObject(rows);
	 }catch(e){
		 return FactoryService.tryCatchError("There are no portfolios");
	 }
	 return portfolioJsons;
	}

	function getTransactions(){
		var transactionJsons;
		try{
			var rows = db.exec("SELECT * FROM transactions");
			transactionJsons = FactoryService.changeSqlArrayToTransactionJsonObject(rows);
	 }catch(e){
		 return FactoryService.tryCatchError("There are no transactions");
	 }
	 return transactionJsons;
	}

	function getWatch(){
		var watchJsons;
		try{
			var rows = db.exec("SELECT * FROM watch");
			watchJsons = FactoryService.changeSqlArrayToWatchJsonObject(rows);
	 }catch(e){
		 return FactoryService.tryCatchError("There is no watch");
	 }
	 return watchJsons;
	}

	function getTransactionsByPortfolioId(portfolioId){
		var transactionsJsons;
		try{
			var rows = db.exec("SELECT * FROM transactions WHERE portfolioId = " + portfolioId);
			transactionsJsons = FactoryService.changeSqlArrayToTransactionJsonObject(rows);
		}catch(e){
			return FactoryService.tryCatchError("There are no transactions for portfolioId: " + portfolioId);
		}
		return transactionsJsons;
	}

	function getTransactionsByPortfolioIdAndShortName(portfolioId, shortName){
		var transactionsJsons;
		try{
			var rows = db.exec("SELECT * FROM transactions WHERE portfolioId = " + portfolioId + " AND exchangeShortName = \'" + shortName + "\'");
			transactionsJsons = FactoryService.changeSqlArrayToTransactionJsonObject(rows);
		}catch(e){
			return FactoryService.tryCatchError("There are no transactions with shortName of \'"+ shortName + "\' for portfolioId: " + portfolioId);
		}
		return transactionsJsons;
	}

	function getWatchByPortfolioId(portfolioId){
		var watchJsons;
		try{
			var rows = db.exec("SELECT * FROM watch WHERE portfolioId = " + portfolioId);
			watchJsons = FactoryService.changeSqlArrayToWatchJsonObject(rows);
		}catch(e){
			return FactoryService.tryCatchError("There is no watch for portfolioId: " + portfolioId);
		}
		return watchJsons;
	}

	function getMostRecentTransaction(portfolioId, shortName){
		var transactionsJsons;
		try{
			var rows = db.exec("SELECT * FROM transactions WHERE portfolioId = " + portfolioId + " AND exchangeShortName = \'" + shortName + "\' ORDER BY id DESC LIMIT 1");
			transactionsJsons = FactoryService.changeSqlArrayToTransactionJsonObject(rows);
		}catch(e){
			return FactoryService.tryCatchError("There are no transactions with shortName: " + shortName + " in portfolio " + portfolioId);
		}
		return transactionsJsons;
	}

	function checkIfPortfolioIdForLiveOrHistoricExists(isLive){
	  var portfolios = getPortfolios();

	  var doesLiveExist = false;
	  for (index in portfolios){
	    if(portfolios[index].isLive == isLive){
	      doesLiveExist = true;
	    }
	  }

	  return doesLiveExist;
	}

	function getCurrentPortfolio(state){
		var isLive;
		if(state === "live"){
			isLive = 0;
		}
		else if(state === "historic"){
			isLive = 1;
		}
		var currentPortfolio;
		try{
			var rows = db.exec("SELECT * FROM portfolio WHERE isLive = " + isLive + " ORDER BY id DESC LIMIT 1");
			currentPortfolio = FactoryService.changeSqlArrayToPortfolioJsonObject(rows);
		}catch(e){
			return FactoryService.tryCatchError("There is no portfolio with " + state + " state");
		}
		return currentPortfolio;
	}

	function getPortfolioById(id){
		var portfolio;
		try{
			var rows = db.exec("SELECT * FROM portfolio WHERE id = " + id);
			portfolio = FactoryService.changeSqlArrayToPortfolioJsonObject(rows);
		}catch(e){
			return FactoryService.tryCatchError("There is no portfolio with the id of " + id);
		}
		return portfolio;
	}

	function updatePortfolio(id, field, value){
		try{
			db.exec("UPDATE portfolio SET " + field +" = \'" + value + "\' WHERE id = " + id);
			saveDb();
		}catch(e){
			console.error(e);
		}
	}

	function setTransactionTotalShares(id, shortName, value){
		try{
			db.exec("UPDATE transactions SET totalShares = \'" + value + "\' WHERE portfolioId = " + id + " AND exchangeShortName = \'" + shortName + "\'");
			saveDb();
		}catch(e){
			console.error(e);
		}
	}

	function saveDb(){
		try {
			fs.unlinkSync('db/electronTrader.sqlite');
		} catch (e) {
			console.log("Unable to delete file; Exception: " + e);
		}
		fs.writeFileSync("db/electronTrader.sqlite", new Buffer(db.export()));
	}

	function clearDB(){
		db.run("Drop Table portfolio");
		db.run("Drop Table transactions");
		db.run("Drop Table watch");
	}
}]);
