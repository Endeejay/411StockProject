angular.module('TY', ['ui.directives']);
stockApp.controller('DatePickerController', ['$scope',  function DatePickerController($scope) {

  $scope.opts = {
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true
  }
  $scope.data = {
    date: "Pick a start Date"
  }
}]);
