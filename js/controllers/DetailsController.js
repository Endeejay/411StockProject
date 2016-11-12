stockApp.controller('DetailsController', function DetailsController($scope, $stateParams, $state, DBService, APIService) {
    if($stateParams.stockObj == null){
    	if($state.is('live.buy_sell.details')){
    		$state.go('live.buy_sell');
    	}
    	else{
    		$state.go('historic.buy_sell');
    	}
    }

    var stockObj = $stateParams.stockObj;
    $scope.stockReal = {};

    getStock(); 

    function getStock(){
        APIService.getSingleStock(stockObj.Symbol).then(function(data){
            $scope.stockReal = data.data[0];
            console.log($scope.stockReal.LastPrice);
        })
    }

    $scope.buyStock = function(){
    	console.log("Bought one of " + stockObj.Symbol);
    }

    $scope.sellStock = function(){
    	console.log("Sold one of " + stockObj.Symbol);
    }

    $scope.watchStock = function(){
        console.log("Started watching " + stockObj.Symbol);
    }
});