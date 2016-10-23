stockApp.service('BuySellService',['$http','$q',function ($http, $q) {


var fs = require("fs");
var deferred = $q.defer();
$http.get('http://localhost:3000/db').then(function (data) {
  deferred.resolve(data);
});

this.getAllStocks = function () {
  return deferred.promise;
};
}]);
