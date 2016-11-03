stockApp.controller('DetailsController', function DetailsController($scope, $stateParams, $state) {
    if($stateParams.stockObj == null){
    	if($state.is('live.buy_sell.details')){
    		$state.go('live.buy_sell');
    	}
    	else{
    		$state.go('historic.buy_sell');
    	}
    }

    var stockObj = $stateParams.stockObj;
    console.log(stockObj);

    $scope.buyStock = function(){
    	console.log("Bought one of " + stockObj.Symbol);
    }

    $scope.sellStock = function(){
    	console.log("Sold one of " + stockObj.Symbol);
    }
});