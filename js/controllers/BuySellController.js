
stockApp.controller('BuySellController', ['$scope', 'BuySellService', function BuySellController($scope, BuySellService) {

  var arrOfData = BuySellService.getTestData();

  arrOfData.forEach(function(currentVal){
    $scope.ExchangeName = currentVal.ExchangeName;
    $scope.Open = currentVal.Open;
    $scope.Close = currentVal.Last;
    $scope.DiffenceBetweenOpenAndClose = currentVal.Last - currentVal.Open;

  })
    $scope.item = {
        chart: {
            renderTo: 'container',
        },
        title: {
            text: 'Chart in Electron'
        },
        series: [{
            type: 'line',
            data: [
                ['a', 1], ['b', 3], ['c', 2]
            ]
        }],
        credits: {
            enabled: false
        }
    }

}]);
