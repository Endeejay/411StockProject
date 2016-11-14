stockApp.service('SQLDBService', [ function(){
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

	function initDb(){
		try {
			db.run("CREATE TABLE IF NOT EXISTS portfolio (id INT UNIQUE, portfolioName TEXT, isLive INT, startDate TEXT, endDate TEXT, totalMoney INT)");
			db.run("CREATE TABLE IF NOT EXISTS watch (id INT UNIQUE, portfolioId INT, symbol TEXT,FOREIGN KEY(portfolioId) REFERENCES portfolio(id))");
			db.run("CREATE TABLE IF NOT EXISTS transactions (id INT UNIQUE, date TEXT, stockName TEXT, portfolioId INT, stockPrice REAL, numOfShares INT, totalPrice REAL, FOREIGN KEY(portfolioId) REFERENCES portfolio(id))");
		} catch (e) {
			console.log(e);
		}
	}

	function createPortfolio(portfolio){
		try{
			var stmt = db.prepare("INSERT INTO portfolio (portfolioName, isLive, startDate, endDate, currency) VALUES(:portfolioName, :isLive, :startDate, :endDate, :currency)");
			stmt.run([portfolio.portfolioName, portfolio.isLive, portfolio.startDate, portfolio.endDate, portfolio.currency]);
			saveDb();
		}catch(e){
			console.log(e);
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
}]);

