
stockApp.controller('BuySellController', ['$scope', 'BuySellService', function BuySellController($scope, BuySellService) {

  var arrOfData = BuySellService.getTestData();

  arrOfData.forEach(function(currentVal){
    $scope.ExchangeName = currentVal.ExchangeName;
    $scope.Open = currentVal.Open;
    $scope.Close = currentVal.Last;
    $scope.DiffenceBetweenOpenAndClose = currentVal.Open - currentVal.Last;

  })

}]);
