stockApp.controller('MainController', ['$scope', 'DBService', function MainController($scope, DBService) {

DBService.initializeDBAtTheBeginningOfStockApp();
}]);
