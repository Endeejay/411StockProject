stockApp.service('APIService',['$http','$q',function ($http, $q) {
	this.getMultipleStocks = getMultipleStocks;
	this.getSingleStock = getSingleStock;
	this.getAllStocks = getAllStocks;
	this.getDifference = getDifference;

	function getAllStocks(){
		var promise = $http({method: 'GET',
			url:'http://localhost:62238/api/Stock'
		});

		return promise;
	}

	function getMultipleStocks(stocks){
		var queryString = "?";

		//build query string
		for(var i =0; i<stocks.length; i++){
			if (i!=stocks.length){
				queryString = queryString + "symbols=" + stocks[i] + '&';				
			}
		}	

		var promise = $http({method: 'GET',
			url:'http://localhost:62238/api/Live/'+queryString
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

	function getDifference(stock){
		var diff;
		var stockObj = getSingleStock(stock);
	}
}]);