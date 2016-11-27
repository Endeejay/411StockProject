stockApp.service('APIService',['$http','$q',function ($http, $q) {
	this.getMultipleStocks = getMultipleStocks;
	this.getSingleStock = getSingleStock;
	this.getAllStocks = getAllStocks;
	this.getRssFeed = getRssFeed;
	this.getRssFeedFromWatch = getRssFeedFromWatch;

	function getAllStocks(){
		var promise = $http({method: 'GET',
			url:'http://localhost:62238/api/Stock'
		});

		return promise;
	}

	function getMultipleStocks(stocks){
		var queryString = "?symbols=";

		//build query string
		for(var i =0; i<stocks.length; i++){
			if (i!=stocks.length && i!=stocks.length -1){
				queryString = queryString + stocks[i] + "&symbols=";		
			}
			else if(i = stocks.length - 1) {
				queryString = queryString + stocks[i];
			}

		}	
 		// console.log("queryString = ", queryString);

		var promise = $http({method: 'GET',
			url:'http://localhost:62238/api/Live/'+queryString
		});
		return promise;
	}

	function getRssFeedFromWatch(watch){
		var queryString = "?s=";
		for(var i = 0; i<watch.length; i++){
			if(i == 0)
				queryString=queryString+watch[i].symbol;
			else
				queryString=queryString+','+watch[i].symbol;
		}

		var promise = $http({
			method:'GET',
			url: 'http://finance.yahoo.com/rss/industry'+queryString
		});

		return promise;
	}

	function getRssFeed(){
		var promise = $http({
			method:'GET',
			url: 'http://finance.yahoo.com/rss/industry?s=googl,xom,pfe,ge'
		});

		return promise;
	}

	function getSingleStock(stock){
		var queryString = "?symbols=" + stock;

		var promise =  $http({method: 'GET',
			url:'http://localhost:62238/api/Live/'+queryString
		});

		return promise;
	}

<<<<<<< HEAD
	function getDifference(stock){
		var diff;
		var stockObj = getSingleStock(stock);
	}

	function getOriginalStockPrice(stockSymbol, startDate){

		var testChart = {
			normalized: false,
			numberOfDays: MathService.getDateLength(startDate),
			dataPeriod: "Day",
			elements: {
				element1: {
							symbol : stockSymbol,
							type : "price",
							params : {format: "ohlc"}
						  },
				element2: {
							symbol: stockSymbol,
							type: "volume"
						  }
			}
		};

		var queryString = stock;

		var promise =  $http({method: 'GET',
			url:'http://localhost:62238/api/Charts?params='+stock
		});

		return promise;
	}

	function getChart(stock){

		var testChart = new
		{
			Normalized: false,
			NumberOfDays: 200,
			DataPeriod: "Day",
			Elements: {
				Element1: {
							Symbol : "AAPL",
							Type : "price",
							Params : {"ohlc"}
						  },
				Element2: {
							Symbol: "AAPL",
							Type: "volume"
						  }
			}
		};

		var queryString = "?symbols=" + stock;

		var promise =  $http({method: 'GET',
			url:'http://localhost:62238/api/Charts?params='+queryString
		});

		var request = new RestRequest("InteractiveChart/json?parameters={parameters}");
		var json = SimpleJson.SerializeObject(chart);
		request.AddParameter("parameters", json, ParameterType.UrlSegment);
		var response = client.Execute(request);
		return response.Content;
	}
=======
>>>>>>> master
}]);