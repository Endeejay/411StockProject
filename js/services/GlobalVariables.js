stockApp.service('GlobalVariables', [function () {

    var PortfolioId = 0;
    var HistoricDate = "2016-11-10";

    function getPortfolioId() {
        return PortfolioId;
    }

    function setPortfolioId(newId) {
        PortfolioId = newId;
    }


    function getHistoricDate() {
        return HistoricDate;
    }

    function setHistoricDate(newDate) {
        HistoricDate = newDate;
    }


    return {
        getPortfolioId: getPortfolioId,
        setPortfolioId: setPortfolioId,
        getHistoricDate: getHistoricDate,
        setHistoricDate: setHistoricDate,

    }
}]);