
stockApp.controller('DetailsController', function DetailsController($scope, $stateParams, $state, DBService, APIService, MathService, DetailsService, SQLDBService, FactoryService) {
    if($stateParams.stockObj == null){
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

    $scope.CurrentPortfolioMoney = currentPortfolio[0].currency;
    $scope.Shares = MathService.getTotalShares(currentPortfolio[0].portfolioId, stockObj.Symbol);

    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // //Line chart code

    // DetailsService.getLineData().then(function(data){
    //     debugger;
    //         data = data.data;
    //         makeChart(data);
    // }, function(error){
    //     console.log(error);
    // });

    // function makeLineChart(){
    //     angular.forEach(data, function(value, key) {
    //         if(value.Symbol == stockObj.Symbol)
    //         {
    //             //changing our dates to utc dates
    //             var UTCDates = [];
    //             for(i=0;i<value.Dates.length;i++){
    //             var parts = value.Dates[i].split('/');
    //             var utcDate = Date.UTC(parts[2],parts[0]-1,parts[1]);
    //             UTCDates.push(utcDate);
    //             }
    //             for(i=0;i<value.Prices.length;i++){
    //             var netValue = value.Prices[i]-value.Prices[0];
    //             if(netValue < 0){
    //                 var color = '#f02d41';
    //             }else if(netValue > 0){
    //                 var color = '#2DF04E';
    //             }else {
    //                 var color = '#c3bcad'
    //             }
    //             }
    //             //getting our dat array, and then bigArray and littleArray
    //             var dat = $.map(UTCDates, function(v,i) {return [v,value.Prices[i]]; });
    //             var bigArray=[];
    //             var littleArray = [], size = 2;
    //             //pusing our spliced array shit to the bigArray
    //             while (dat.length > 0) {
    //             bigArray.push(dat.splice(0,size));
    //             }
    //             //our chart item
    //             $scope.linechart = {
    //                 colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
    //                 '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    //                 chart: {
    //                     renderTo: 'container',
    //                     backgroundColor: '#3e3e40',
    //                     borderColor: 'black',
    //                     borderWidth: 2,
    //                     marginLeft: 75,
    //                     marginRight: 75,
    //                     events: {
    //                     click: function() {
    //                         if($state.is("live.buy_sell")){
    //                         $state.go('live.buy_sell.details', {stockObj: value});
    //                         }
    //                         else if($state.is("historic.buy_sell")){
    //                         $state.go('historic.buy_sell.details', {stockObj: value});
    //                         }
    //                     }
    //                     },
    //                     style: {
    //                     fontFamily: "'Roboto', sans-serif"
    //                     }
    //                 },
    //                 title: {
    //                     text: value.Name,
    //                     style: {
    //                     color: 'white'
    //                     }
    //                 },
    //                 subtitle: {
    //                     text: value.Symbol,
    //                     style: {
    //                     color: '#E0E0E3'
    //                     }
    //                 },
    //                 yAxis: {
    //                 type: 'string',
    //                 title: {
    //                     text: 'Prices (USD)',
    //                     style: {
    //                     color: 'white'
    //                     }
    //                 },
    //                 labels: {
    //                     style: {
    //                     color: 'white'
    //                     }
    //                 }
    //                 },
    //                 xAxis: {
    //                 type: 'datetime',
    //                 labels: {
    //                     format: '{value:%m/%d/%Y}',
    //                     // rotation: 45,
    //                     align: 'left',
    //                     style: {
    //                     color: 'white'
    //                     }
    //                 },
    //                 title: {
    //                     text: 'Dates',
    //                     style: {
    //                     color: 'white'
    //                     }
    //                 }
    //                 },
    //                 series: [{
    //                     name: 'Price',
    //                     showInLegend: false,
    //                     type: 'line',
    //                     data: bigArray,
    //                     color: color
    //                 }],
    //                 credits: {
    //                     enabled: false
    //                 }
    //             }
    //         }
    //     });
    // }

    //end of Line Chart

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //candlestick chart code
    makeStockChart();
    function makeStockChart(){
    DetailsService.getStockData().then(function(data){
    var chartData = [];
    var dataLength = data.length;
    for (var i = 0; i < 10; i += 1) {
        chartData.push([
            data[i][0], // the date
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
      ]);
    }
        $scope.stockchart = {
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
        };
      })
    }

    //end of candlestick chart code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    getStock();

    //get the current price before performing functions so the user knows current price
    var currentPrice = MathService.getMostRecentStockPrice(stockObj);
    $scope.currentPrice = currentPrice;

    function getStock(){
        APIService.getSingleStock(stockObj.Symbol).then(function(data){
            $scope.stockReal = data.data[0];
        })
    }

    $scope.buyStock = function(){
      var sharesInput = document.getElementById("sharesBuy").value;
      if(!sharesInput==0)
      {
        sharesInput = parseInt(sharesInput);

        var state = $state.current.name
        var isLiveInt = FactoryService.getCurrentStateInt(state);
        var currentStateString = state.substr(0, state.indexOf('.'));
        var currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
        var currentPrice = MathService.getMostRecentStockPrice(stockObj);


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
        if(!sharesInput==0)
        {
          sharesInput = parseInt(sharesInput);
          var state = $state.current.name
          var isLiveInt = FactoryService.getCurrentStateInt(state);
          var currentStateString = state.substr(0, state.indexOf('.'));
          var currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
          var currentPrice = MathService.getMostRecentStockPrice(stockObj);

          $scope.currentPrice = currentPrice;

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
      var state = $state.current.name
      var isLiveInt = FactoryService.getCurrentStateInt(state);
      var currentStateString = state.substr(0, state.indexOf('.'));
      var currentPortfolio = SQLDBService.getCurrentPortfolio(currentStateString);
      var currentPortfolioId = currentPortfolio[0].portfolioId;

      if(checkIfStockIsWatched(currentPortfolioId, stockObj.Symbol) === false){
        Materialize.toast("Started watching " + stockObj.Symbol, 4000);
        var currentPrice = MathService.getMostRecentStockPrice(stockObj);
        var date = "";
        if (isLiveInt == 0){
            date = new Date() + "";
        }else{
            //figure out date for histoic state
            date = new Date() + "";
        }

        var watch = FactoryService.makeWatchObject(currentPortfolioId, stockObj.Symbol, currentPrice, date);
        SQLDBService.createWatch(watch);
      }
      else{
        Materialize.toast("Already watching " + stockObj.Symbol, 4000);
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
        var currentPrice = MathService.getMostRecentStockPrice(stockObj);
        var totalSharesAtTransaction = MathService.getTotalShares(currentPortfolio[0].portfolioId, stockObj.Symbol);
        var totalSharesAfterTransaction = getTotalSharesAfterTransaction(totalSharesAtTransaction, amountOfShares, buyOrSell);
        var totalTransactionPrice = MathService.totalTransactionPrice(amountOfShares, currentPrice);
        //this only works in live, we need to figure out date for historic
        var date;
        if (isLiveInt == 1){
            date = new Date() + "";
        }else{
            //figure out date for histoic state
            date = new Date() + "";
        }

        var transaction = FactoryService.makeTransactionObject(currentPortfolio[0].portfolioId, stockObj.Name, stockObj.Symbol, date, currentPrice, totalSharesAfterTransaction, totalSharesAfterTransaction, amountOfShares, buyOrSell, currentPortfolio[0].currency, totalTransactionPrice);
        SQLDBService.createTransaction(transaction);
        SQLDBService.setTransactionTotalShares(currentPortfolio[0].portfolioId, stockObj.Symbol, totalSharesAfterTransaction);

        var newCurrency = MathService.calculateNewCurrencyValue(currentPortfolio[0].currency, totalTransactionPrice, buyOrSell);
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
