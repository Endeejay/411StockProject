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

}]);