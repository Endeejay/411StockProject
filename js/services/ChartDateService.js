stockApp.service('ChartDateService',['FactoryService', function (FactoryService) {
	this.getStartDate = getStartDate;
    this.getEndDate = getEndDate;

    function getStartDate(portfolio){
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

    function getEndDate(portfolio){
        if(portfolio[0].isLive == 0){
            var date = FactoryService.formatDateForYahoo(new Date());
            return date;
        }else if(portfolio[0].isHistoric == 1){
            return portfolio[0].currentDate;
        }else{
            return "They should not be there"
        }
    }
}]);