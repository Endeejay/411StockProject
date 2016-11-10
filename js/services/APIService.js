stockApp.service('APIService',['$http','$q',function ($http, $q) {
	this.getMultipleStocks = getMultipleStocks;
	this.getSingleStock = getSingleStock;

	function getMultipleStocks(stocks){
		var queryString = "?symbols=";

		//build query string
		for(var i =0; i<stocks.length; i++){
			queryString = queryString + stocks[i] + '&symbols=';
		}	

		$http({method: 'GET',
			url:'http://localhost:62238/api/Live/'+queryString
		}).then(function success(response){
			return response.data;
		}, function error(response){
			console.error(response);
			return [];	
		})
	}

	function getSingleStock(stock){
		var queryString = "?symbols=" + stock;

		var promise =  $http({method: 'GET',
			url:'http://localhost:62238/api/Live/'+queryString
		});

		return promise;
	}

}]);