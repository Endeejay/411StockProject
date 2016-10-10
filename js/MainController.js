var isSelectPage = true;
var selector = '.side-nav li';

stockApp.controller('MainController', ['$scope', function MainController($scope) {

  $scope.message = "Selection page";
  $scope.isSelectPage = true;

//prevents switch tab from highlighting active
  $(selector).removeClass('active');

    $(selector).on('click', function() {
      $(selector).removeClass('active');
      $(this).addClass('active');
    });
}]);
