
stockApp.controller('DetailsController', function DetailsController($scope, $q, $stateParams, $state, DBService, APIService, MathService, DetailsService, SQLDBService, FactoryService, ChartDateService, YahooService) {
    if($stateParams.stockObj.Symbol == null ){
    	if($state.is('live.buy_sell.details')){
    		$state.go('live.buy_sell');
    	}
    	else{
    		$state.go('historic.buy_sell');
    	}
    }
    var stockObj = $stateParams.stockObj;
    $scope.stockObj = stockObj;
    $scope.stockReal = {};
    var state = $state.current.name
    var isLiveInt = FactoryService.getCurrentStateInt(state);
    var currentStateString = state.substr(0, state.indexOf('.'));
    var currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
    if(currentPortfolio[0].isLive == 0){
        var currentPrice = MathService.getMostRecentStockPrice(stockObj);
        $scope.currentPrice = currentPrice;
    }
    else{
        var getStartDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
        var startDate = FactoryService.getDateMinusOneDay(getStartDate1);

        var getEndDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
        var endDate = FactoryService.formatDateForYahoo(getEndDate1);


        YahooService.getAStock(stockObj.Symbol, startDate, endDate).then(function(data){
            $scope.$apply(function() {
                var currentPrice = data[data.length-1].adjClose;
                $scope.currentPrice = currentPrice;
            })
        });
    }
    var currentPrice = $scope.currentPrice;

    $scope.CurrentPortfolioMoney = currentPortfolio[0].currency;
    $scope.Shares = MathService.getTotalShares(currentPortfolio[0].portfolioId, stockObj.Symbol);

    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // //Line chart code



    //end of Line Chart

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //candlestick chart code

    function getStartDate(portfolio, dateLength){
        if(portfolio[0].isLive == 0){
            var yearMinusOne = new Date().getFullYear()-1;
            var month = new Date().getMonth();
            var day = new Date().getDate();

            var returnDate = FactoryService.formatDateForYahoo(new Date(yearMinusOne, month, day));

            return returnDate;

        }else if(portfolio[0].isHistoric == 1){
            return portfolio[0].startDate;
        }else{
            return "They should not be there"
        }
    }

    makeCharts(stockObj, 3);

    $scope.setChart = function(value){
        switch(value) {
            case 1:
                makeCharts(stockObj, value);
                break;
            case 2:
                makeCharts(stockObj, value);
                break;
            default:
                makeCharts(stockObj, value);
        }
    }

    
    function makeCharts(stockObj, dateLength) {
        $scope.stockChart = {};
        var startDate = ChartDateService.getStartDate(currentPortfolio, dateLength);
        var endDate = ChartDateService.getEndDate(currentPortfolio);
        
        YahooService.getAStock(stockObj.Symbol, startDate, endDate).then(function(returningData) {
    
            $scope.$apply(function() {

                //line

                /////////////////////////////////////////////////////////////////////////////////////////

                var chartData = setLineChartData(returningData);

                $scope.lineChart = {
                    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                        '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
                    chart: {
                        zoomType: 'x',
                        backgroundColor: '#3e3e40',
                        // events: {
                        //     selection: function (event) {
                        //         if (event.xAxis) {
                        //             $report.html('Last selection:<br/>min: ' + Highcharts.dateFormat('%Y-%m-%d', event.xAxis[0].min) +
                        //                 ', max: ' + Highcharts.dateFormat('%Y-%m-%d', event.xAxis[0].max));
                        //         } else {
                        //             $report.html('Selection reset');
                        //         }
                        //     }
                        // },
                        style: {
                        fontFamily: "'Roboto', sans-serif"
                        },
                        plotBorderColor: '#606063'
                    },
                    rangeSelector: {
                        selected: 1,
                        buttonTheme: {
                            fill: '#505053',
                            stroke: '#000000',
                            style: {
                                color: '#CCC'
                            },
                            states: {
                                hover: {
                                fill: '#707073',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                                },
                                select: {
                                fill: '#000003',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                                }
                            }
                        },
                        inputBoxBorderColor: '#505053',
                        inputStyle: {
                            backgroundColor: '#333',
                            color: 'silver'
                        },
                        labelStyle: {
                            color: 'silver'
                        }
                    },
                    title: {
                        text: stockObj.Name,
                        style: {
                            color: '#E0E0E3',
                            textTransform: 'uppercase',
                            fontSize: '20px'
                        }
                    },
                    subtitle: {
                        text: stockObj.Symbol,
                        style: {
                            color: '#E0E0E3',
                            textTransform: 'uppercase'
                        }
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                        format: '{value:%m/%d/%Y}',
                        // rotation: 45,
                        align: 'left',
                            style: {
                            color: '#E0E0E3'
                            }
                        },
                        lineColor: '#707073',
                        minorGridLineColor: '#505053',
                        tickColor: '#707073',
                        title: {
                            style: {
                            color: '#A0A0A3'

                            }
                        }
                    },
                    yAxis: {
                        type: 'string',
                        title: {
                        text: 'Prices (USD)',
                        style: {
                            color: 'white'
                        }
                        },
                        labels: {
                        style: {
                            color: 'white'
                        }
                        }
                    },
                    plotOptions: {
                        series: {
                        dataLabels: {
                            color: '#B0B0B3'
                        },
                        marker: {
                            lineColor: '#333'
                        }
                        },
                        boxplot: {
                        fillColor: '#505053'
                        },
                        candlestick: {
                        lineColor: 'white',
                        color: '#f02d41',
                        upColor: '#2DF04E'
                        },
                        errorbar: {
                        color: 'white'
                        }
                    },
                    tooltip: {
                        valueDecimals: 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        style: {
                            color: '#F0F0F0'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    navigation: {
                        buttonOptions: {
                            symbolStroke: '#DDDDDD',
                            theme: {
                            fill: '#505053'
                            }
                        }
                    },
                    series: [{
                        type: 'line',
                        name: stockObj.Name,
                        data: chartData,
                        dataGrouping: {
                        units: [
                            [
                            'week', // unit name
                            [1] // allowed multiples
                            ], [
                            'month',
                                [1, 2, 3, 4, 6]
                            ]
                            ]
                        }
                        }],
                        scrollbar: {
                            enabled: false
                        }
                    }

                /////////////////////////////////////////////////////////////////////////////////////////

                //Candlestick

                //////////////////////////////////////////////////////////////////////////////////////////
                var chartData = setStockChartData(returningData);

                $scope.stockChart = {
                    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                        '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
                    chart: {
                        zoomType: 'x',
                        backgroundColor: '#3e3e40',
                        // events: {
                        //     selection: function (event) {
                        //         if (event.xAxis) {
                        //             $report.html('Last selection:<br/>min: ' + Highcharts.dateFormat('%Y-%m-%d', event.xAxis[0].min) +
                        //                 ', max: ' + Highcharts.dateFormat('%Y-%m-%d', event.xAxis[0].max));
                        //         } else {
                        //             $report.html('Selection reset');
                        //         }
                        //     }
                        // },
                        style: {
                        fontFamily: "'Roboto', sans-serif"
                        },
                        plotBorderColor: '#606063'
                    },
                    rangeSelector: {
                        selected: 1,
                        buttonTheme: {
                            fill: '#505053',
                            stroke: '#000000',
                            style: {
                                color: '#CCC'
                            },
                            states: {
                                hover: {
                                fill: '#707073',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                                },
                                select: {
                                fill: '#000003',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                                }
                            }
                        },
                        inputBoxBorderColor: '#505053',
                        inputStyle: {
                            backgroundColor: '#333',
                            color: 'silver'
                        },
                        labelStyle: {
                            color: 'silver'
                        }
                    },
                    title: {
                        text: stockObj.Name,
                        style: {
                            color: '#E0E0E3',
                            textTransform: 'uppercase',
                            fontSize: '20px'
                        }
                    },
                    subtitle: {
                        text: stockObj.Symbol,
                        style: {
                            color: '#E0E0E3',
                            textTransform: 'uppercase'
                        }
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                        format: '{value:%m/%d/%Y}',
                        // rotation: 45,
                        align: 'left',
                            style: {
                            color: '#E0E0E3'
                            }
                        },
                        lineColor: '#707073',
                        minorGridLineColor: '#505053',
                        tickColor: '#707073',
                        title: {
                            style: {
                            color: '#A0A0A3'

                            }
                        }
                    },
                    yAxis: {
                        type: 'string',
                        title: {
                        text: 'Prices (USD)',
                        style: {
                            color: 'white'
                        }
                        },
                        labels: {
                        style: {
                            color: 'white'
                        }
                        }
                    },
                    plotOptions: {
                        series: {
                        dataLabels: {
                            color: '#B0B0B3'
                        },
                        marker: {
                            lineColor: '#333'
                        }
                        },
                        boxplot: {
                        fillColor: '#505053'
                        },
                        candlestick: {
                        lineColor: 'white',
                        color: '#f02d41',
                        upColor: '#2DF04E'
                        },
                        errorbar: {
                        color: 'white'
                        }
                    },
                    tooltip: {
                        valueDecimals: 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        style: {
                            color: '#F0F0F0'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    navigation: {
                        buttonOptions: {
                            symbolStroke: '#DDDDDD',
                            theme: {
                            fill: '#505053'
                            }
                        }
                    },
                    series: [{
                        type: 'candlestick',
                        name: stockObj.Name,
                        data: chartData,
                        dataGrouping: {
                        units: [
                            [
                            'week', // unit name
                            [1] // allowed multiples
                            ], [
                            'month',
                                [1, 2, 3, 4, 6]
                            ]
                            ]
                        }
                        }],
                        scrollbar: {
                            enabled: false
                        }
                    }    
            })
        });
    }

    function setLineChartData(data){
        var DataArray = [];
        for (var i = 0; i < data.length; i += 1) {
            DataArray.push([
                Date.parse(data[i].date), // the date
                
                data[i].adjClose, //price
            ]);
        }

        return DataArray;
    }
    
    function setStockChartData(data){
        var DataArray = [];
        for (var i = 0; i < data.length; i += 1) {
            DataArray.push([
                Date.parse(data[i].date), // the date
                
                data[i].open, // open
                data[i].high, // high
                data[i].low, // low
                data[i].close // close
            ]);
        }

        return DataArray;
    }

    //end of candlestick chart code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    getStock();

    //get the current price before performing functions so the user knows current price
    if(currentPortfolio[0].isLive == 0){
        var currentPrice = MathService.getMostRecentStockPrice(stockObj);
        $scope.currentPrice = currentPrice;
    }
    else{
        var getStartDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
        var startDate = FactoryService.getDateMinusOneDay(getStartDate1);

        var getEndDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
        var endDate = FactoryService.formatDateForYahoo(getEndDate1);


        YahooService.getAStock(stockObj.Symbol, startDate, endDate).then(function(data){
            $scope.$apply(function() {
                var currentPrice = data[data.length-1].adjClose;
                $scope.currentPrice = currentPrice;
            })
        });
    }
    var currentPrice = $scope.currentPrice;

    function getStock(){
        APIService.getSingleStock(stockObj.Symbol).then(function(data){
            $scope.stockReal = data.data[0];
        })
    }

    $scope.buyStock = function(){
      var sharesInput = document.getElementById("sharesBuy").value;
      if(!sharesInput == 0 && stockObj.Symbol)
      {
        sharesInput = parseInt(sharesInput);

        var state = $state.current.name
        var isLiveInt = FactoryService.getCurrentStateInt(state);
        var currentStateString = state.substr(0, state.indexOf('.'));
        var currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
        if(currentPortfolio[0].isLive == 0){
            var currentPrice = MathService.getMostRecentStockPrice(stockObj);
            $scope.currentPrice = currentPrice;
        }
        else{
            var getStartDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
            var startDate = FactoryService.getDateMinusOneDay(getStartDate1);

            var getEndDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
            var endDate = FactoryService.formatDateForYahoo(getEndDate1);


            YahooService.getAStock(stockObj.Symbol, startDate, endDate).then(function(data){
                $scope.$apply(function() {
                    var currentPrice = data[data.length-1].adjClose;
                    $scope.currentPrice = currentPrice;
                })
            });
        }
        var currentPrice = $scope.currentPrice;


        if(checkTransactionForEnoughCurrency(sharesInput,currentPrice,currentPortfolio[0].currency)){
            if (sharesInput == 1){
              buyOrSellStock(0,sharesInput);
              Materialize.toast('Successfully purchased ' + sharesInput + ' share of ' + stockObj.Symbol, 4000);

              $scope.CurrentPortfolioMoney = parseInt(currentPortfolio[0].currency) - (parseInt(currentPrice) * sharesInput);
              $scope.Shares = parseInt($scope.Shares) + sharesInput;
            }
            else if (sharesInput > 1){
              buyOrSellStock(0,sharesInput);
              Materialize.toast('Successfully purchased ' + sharesInput + ' shares of ' + stockObj.Symbol, 4000);

              $scope.CurrentPortfolioMoney = parseInt(currentPortfolio[0].currency) - (currentPrice) * sharesInput;
              $scope.Shares = parseInt($scope.Shares) + sharesInput;
            }
        }else{
            if (isNaN(sharesInput)) {
                Materialize.toast('Please enter a number of shares to purchase.', 4000);
            }
            else {
                Materialize.toast("You don't have enough money for this!", 4000);
            }
        }
      }
    }

    $scope.sellStock = function(){
        var sharesInput = document.getElementById("sharesSell").value;
        if(!sharesInput == 0 && stockObj.Symbol)
        {
          sharesInput = parseInt(sharesInput);
          var state = $state.current.name
          var isLiveInt = FactoryService.getCurrentStateInt(state);
          var currentStateString = state.substr(0, state.indexOf('.'));
          var currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
          if(currentPortfolio[0].isLive == 0){
                var currentPrice = MathService.getMostRecentStockPrice(stockObj);
                $scope.currentPrice = currentPrice;
            }
            else{
                var getStartDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
                var startDate = FactoryService.getDateMinusOneDay(getStartDate1);

                var getEndDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
                var endDate = FactoryService.formatDateForYahoo(getEndDate1);


                YahooService.getAStock(stockObj.Symbol, startDate, endDate).then(function(data){
                    $scope.$apply(function() {
                        var currentPrice = data[data.length-1].adjClose;
                        $scope.currentPrice = currentPrice;
                    })
                });
            }
            var currentPrice = $scope.currentPrice;

          if(checkIfStockIsBought(currentPortfolio, stockObj.Symbol, sharesInput)){
              if (sharesInput == 1){
                buyOrSellStock(1,sharesInput);
                Materialize.toast('Successfully sold ' + sharesInput + ' share of ' + stockObj.Symbol, 4000);

                $scope.CurrentPortfolioMoney = currentPortfolio[0].currency + (currentPrice * sharesInput);
                $scope.Shares = parseInt($scope.Shares) - sharesInput;
              }
              else if (sharesInput >= 1){
                buyOrSellStock(1,sharesInput);
                Materialize.toast('Successfully sold ' + sharesInput + ' shares of ' + stockObj.Symbol, 4000);

                $scope.CurrentPortfolioMoney = currentPortfolio[0].currency + (currentPrice * sharesInput);
                $scope.Shares = parseInt($scope.Shares) - sharesInput;
              }
          }else{
              if (isNaN(sharesInput)) {
                  Materialize.toast('Please enter a number of shares to sell.', 4000);
              }
              else {
                  Materialize.toast("You can't sell things you don't own.", 4000);
              }
          }
        }
    }

    $scope.watchStock = function(){
      if(stockObj.Symbol){
        var state = $state.current.name
        var isLiveInt = FactoryService.getCurrentStateInt(state);
        var currentStateString = state.substr(0, state.indexOf('.'));
        var currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
        var currentPortfolioId = currentPortfolio[0].portfolioId;

        if(checkIfStockIsWatched(currentPortfolioId, stockObj.Symbol) === false){
          Materialize.toast("Started watching " + stockObj.Symbol, 4000);
          if(currentPortfolio[0].isLive == 0){
                var currentPrice = MathService.getMostRecentStockPrice(stockObj);
                $scope.currentPrice = currentPrice;
            }
            else{
                var getStartDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
                var startDate = FactoryService.getDateMinusOneDay(getStartDate1);

                var getEndDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
                var endDate = FactoryService.formatDateForYahoo(getEndDate1);


                YahooService.getAStock(stockObj.Symbol, startDate, endDate).then(function(data){
                    $scope.$apply(function() {
                        var currentPrice = data[data.length-1].adjClose;
                        $scope.currentPrice = currentPrice;
                  })
              });
          }
          var currentPrice = $scope.currentPrice;
          var date = "";
          if (isLiveInt == 0){
              date = new Date() + "";
          }else{
              //figure out date for histoic state
              date = currentPortfolio[0].currentDate;
          }

          var watch = FactoryService.makeWatchObject(currentPortfolioId, stockObj.Symbol, currentPrice, date);
          SQLDBService.createWatch(watch);
        }
        else{
          Materialize.toast("Already watching " + stockObj.Symbol, 4000);
        }
      }
    }

    function checkIfStockIsWatched(portfolioId, symbol){
      var watch = SQLDBService.getWatchByPortfolioId(portfolioId);
      var hasWatch = false;
      for(index in watch){
        if(watch[index].symbol === symbol){
          hasWatch = true;
        }
      }
      return hasWatch;
    }

    function buyOrSellStock(buyOrSell, amountOfShares){
        var state = $state.current.name
        var isLiveInt = FactoryService.getCurrentStateInt(state);
        var currentStateString = state.substr(0, state.indexOf('.'));
        var currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
        if(currentPortfolio[0].isLive == 0){
            var currentPrice = MathService.getMostRecentStockPrice(stockObj);
            $scope.currentPrice = currentPrice;
        }
        else{
            var getStartDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
            var startDate = FactoryService.getDateMinusOneDay(getStartDate1);

            var getEndDate1 = new Date(FactoryService.formatDatePickerDate(currentPortfolio[0].currentDate, "/", "-"));
            var endDate = FactoryService.formatDateForYahoo(getEndDate1);


            YahooService.getAStock(stockObj.Symbol, startDate, endDate).then(function(data){
                $scope.$apply(function() {
                    var currentPrice = data[data.length-1].adjClose;
                    $scope.currentPrice = currentPrice;
                })
            });
        }
        var currentPrice = $scope.currentPrice;
        var totalSharesAtTransaction = MathService.getTotalShares(currentPortfolio[0].portfolioId, stockObj.Symbol);
        var totalSharesAfterTransaction = getTotalSharesAfterTransaction(totalSharesAtTransaction, amountOfShares, buyOrSell);
        var totalTransactionPrice = MathService.totalTransactionPrice(amountOfShares, currentPrice);
        var newCurrency = MathService.calculateNewCurrencyValue(currentPortfolio[0].currency, totalTransactionPrice, buyOrSell);


        //this only works in live, we need to figure out date for historic
        var date;
        if (isLiveInt == 1){
            date = new Date() + "";
        }else{
            //figure out date for histoic state
            date = currentPortfolio[0].currentDate;
        }

        var transaction = FactoryService.makeTransactionObject(currentPortfolio[0].portfolioId, stockObj.Symbol, date, currentPrice, totalSharesAfterTransaction, totalSharesAfterTransaction, amountOfShares, buyOrSell, currentPortfolio[0].currency, totalTransactionPrice, newCurrency);
        SQLDBService.createTransaction(transaction);
        SQLDBService.setTransactionTotalShares(currentPortfolio[0].portfolioId, stockObj.Symbol, totalSharesAfterTransaction);

        SQLDBService.updatePortfolio(currentPortfolio[0].portfolioId,"currency",newCurrency);
    }

    function checkTransactionForEnoughCurrency(shares, priceOfStock, currentCurrency){
        var totalTransactionPrice = MathService.totalTransactionPrice(shares, priceOfStock);
        var isEnough = MathService.checkCurrencyEnoughForPurchase(totalTransactionPrice, currentCurrency);
        return isEnough;
    }

    function checkIfStockIsBought(currentPortfolio, stockSymbol, amountWantedToSell){
        var haveEnoughShares;
        var totalSharesAtTransaction = MathService.getTotalShares(currentPortfolio[0].portfolioId, stockSymbol)
        if(totalSharesAtTransaction >= amountWantedToSell){
            haveEnoughShares = true;
        }else{
            haveEnoughShares = false;
        }
        return haveEnoughShares;
    }

    function getTotalSharesAfterTransaction(currentShares, sharesAtTransaction, buyOrSell){
        var totalSharesAfterTransaction = 0;
        if(buyOrSell == 0){
            totalSharesAfterTransaction = currentShares + sharesAtTransaction;
        }else{
            totalSharesAfterTransaction = currentShares - sharesAtTransaction;
        }
        return totalSharesAfterTransaction;
    }
});
