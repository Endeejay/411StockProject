stockApp.service('ChartDateService',['FactoryService', function (FactoryService) {
	this.getStartDate = getStartDate;
    this.getEndDate = getEndDate;

    function getStartDate(portfolio, dateLength){
        if(portfolio[0].isLive == 0){
            var date = new Date();
            switch(dateLength) {
            case 1:
                var yearMinusOne = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate()-7;

                var returnDate = FactoryService.formatDateForYahoo(new Date(yearMinusOne, month, day));

                return returnDate;
            case 2:
                var yearMinusOne = date.getFullYear();
                var month = date.getMonth()-1;
                var day = date.getDate();

                var returnDate = FactoryService.formatDateForYahoo(new Date(yearMinusOne, month, day));

                return returnDate;
            default:
                var yearMinusOne = date.getFullYear()-1;
                var month = date.getMonth();
                var day = date.getDate();

                var returnDate = FactoryService.formatDateForYahoo(new Date(yearMinusOne, month, day));

                return returnDate;
            }
        }else if(portfolio[0].isLive == 1){
            var date = new Date(FactoryService.formatDatePickerDate(portfolio[0].currentDate, "/", "-"));
            switch(dateLength) {
            case 1:
                var yearMinusOne = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate()-7;

                var returnDate = FactoryService.formatDateForYahoo(new Date(yearMinusOne, month, day));

                return returnDate;
            case 2:
                var yearMinusOne = date.getFullYear();
                var month = date.getMonth()-1;
                var day = date.getDate();

                var returnDate = FactoryService.formatDateForYahoo(new Date(yearMinusOne, month, day));

                return returnDate;
            default:
                var yearMinusOne = date.getFullYear()-1;
                var month = date.getMonth();
                var day = date.getDate();

                var returnDate = FactoryService.formatDateForYahoo(new Date(yearMinusOne, month, day));

                return returnDate;
            }
        }else{
            return "They should not be there"
        }
    }

    function getEndDate(portfolio){
        if(portfolio[0].isLive == 0){
            var date = FactoryService.formatDateForYahoo(new Date());
            return date;
        }else if(portfolio[0].isLive == 1){
            return FactoryService.formatDatePickerDate(portfolio[0].currentDate, "/", "-");
        }else{
            return "They should not be there"
        }
    }
}]);