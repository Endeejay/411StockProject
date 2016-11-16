stockApp.service('DetailsService',['$http','$q',function ($http, $q) {


var fs = require("fs");
var deferred = $q.defer();
$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?a=e&filename=aapl-ohlc.json&callback=?').then(function (data) {
  deferred.resolve(data);
});

this.getStockData = function () {
  return deferred.promise;
};
}]);
