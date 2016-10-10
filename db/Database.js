var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

function DatabaseInit(fileName){
  var path = 'file://' + __dirname + '/db/' + fileName + '.db';

  if(File.Exists(path)){
    var db = sqlite3.Database(fileName + '.db');
    return db;
  }
  else {
    var db = new sqlite3.Database(fileName + '.db');
    return db;
  }
}

function CreateRequiredTables(db){
  db.serialize(function() {

    db.run("CREATE TABLE stock_history(exchange_short_name CHAR(4) NOT NULL, exchange_name CHAR(50) NOT NULL, trade_time DATETIME NOT NULL, stock_value REAL NOT NULL, number_of_shares INT NOT NULL)");
    db.run("CREATE TABLE watched_stocks(exchange_short_name CHAR(4) NOT NULL)");

    });
  });

  db.close();
}

function InsertRecordIntoStockHistoryTable(db, exchange_short_name, exchange_name, trade_time, stock_value, number_of_shares){
  db.serialize(function() {
    db.run("INSERT INTO stock_history(" + exchange_short_name + "," + exchange_name + "," + trade_time + "," + stock_value +"," + number_of_shares + ")");

    });
  });

  db.close();
}

function InsertRecordIntoWatchedStocks(db, exchange_short_name){
  db.serialize(function() {

    db.run("CREATE TABLE watched_stocks(" + exchange_short_name + ")");


    });
  });

  db.close();
}
