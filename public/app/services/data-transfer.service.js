

angular.module('stockQuotesApp').service('dataTransferService', ['$http', '$localStorage', '$state', 'httpService', 'dialogService', '$filter', '$interval', function ($http, $localStorage, $state, httpService, dialogService, $filter, $interval) {


        var service = this;
        var httpService = httpService;
        var dialogService = dialogService;
        console.log('In Data Transfer Service');
        service.combinedData;
        dialogService.showLoadingDialog();

        var config = {
                params: {
                        token: $localStorage.token
                }
        }

        service.allInitialInvestmentsValues = [];
        service.allCurrentInvestmentValues = [];
        service.allSymbols = [];

        service.build_charts = true;

        service.historicalPortfolio;
        service.historicalPortfolioLabels;

        service.changePercent;
        service.changeDollar;




        service.gatherRobinhoodData = function (config) {
                config = {
                        params: {
                                token: $localStorage.token
                        }
                }
                var accountInfoPromise = httpService.getAccountInfo(config);
                accountInfoPromise.then(function (results) {
                        service.portfolioInfo = results.results[0];
                        service.accountEquity = results.results[0].equity;
                        //     console.log(service.accountEquity);

                })


                var positionPromise = httpService.getPositions(config);
                positionPromise.then(function (results) {
                        // service.positions = results.results;
                        //     console.log(service.positions);
                        service.instruments = [];
                        service.positions = [];
                        for (j = 0; j < results.results.length; j++) {
                                if (results.results[j].quantity != 0) {
                                        service.positions.push(results.results[j])
                                        service.instruments.push(results.results[j].instrument);
                                }
                        }


                        // console.log(service.instruments)
                }).then(function () {
                        var accountPromise = httpService.getAccount(config);
                        accountPromise.then(function (result) {
                                service.accountData = result;


                                // config.params.instrumentUrl = service.position;
                                config.params.collection = service.instruments;
                                var instrumentsPromise = httpService.getInstruments(config);
                                instrumentsPromise.then(function (result) {
                                        service.instrumentData = result;
                                        service.symbols = [];
                                        service.symbolsJoined = [];
                                        service.combinedData = {};


                                        for (g = 0; g < service.positions.length; g++) {
                                                if (service.positions[g].quantity != 0) {
                                                        service.symbols.push(service.instrumentData[g].symbol);
                                                        service.symbolsJoined.push(service.instrumentData[g].symbol);
                                                }

                                        }
                                        service.symbolsJoined.join();
                                        config.params.symbols = service.symbolsJoined;
                                        config.params.userID = service.accountData.results[0].account_number;


                                        var historicalsTodayPromise = httpService.getPortfolioToday(config);
                                        historicalsTodayPromise.then(function (result) {
                                                service.historicalsDay = result.equity_historicals;
                                                service.historicalPortfolio = [];
                                                service.historicalPortfolioLabels = [];
                                                for (j = 0; j < result.equity_historicals.length; j++) {
                                                        service.historicalPortfolio.push(result.equity_historicals[j].adjusted_close_equity);
                                                        service.historicalPortfolioLabels.push(result.equity_historicals[j].begins_at);
                                                }
                                                var begin = parseInt(result.equity_historicals[0].adjusted_close_equity, 10);
                                                var end = parseInt(result.equity_historicals[result.equity_historicals.length - 1].adjusted_close_equity, 10);
                                                if (begin < end) {
                                                        service.colorsLine = [
                                                                "#5bda90"
                                                        ]
                                                }
                                                else {
                                                        service.colorsLine = [
                                                                "#ff766c"
                                                        ]
                                                }
                                                service.changePercent = ((end - begin) / begin) * 100;
                                                service.changeDollar = (end - begin)

                                                var allQuotesPromise = httpService.getAllQuotes(config);
                                                allQuotesPromise.then(function (result) {
                                                        service.quotes = result.results;

                                                        var userDataPromise = httpService.getUserData(config)
                                                        userDataPromise.then(function (result) {
                                                                service.user = result;
                                                                // console.log(service.quotes);
                                                                k = 0;

                                                                for (symbol in service.symbols) {


                                                                        service.combinedData[service.symbols[k]] = {
                                                                                positions: service.positions[k],
                                                                                instruments: service.instrumentData[k],
                                                                                quotes: service.quotes[k]
                                                                                // historicals: {
                                                                                //         fiveMinuteDay: service.historicalsDay[symbol].historicals
                                                                                // }

                                                                        }


                                                                        if (service.positions[k].quantity != 0) {
                                                                                service.allInitialInvestmentsValues.push(service.positions[k].average_buy_price * service.positions[k].quantity)
                                                                                service.allCurrentInvestmentValues.push(service.quotes[k].last_trade_price * service.positions[k].quantity)
                                                                        }
                                                                        k++
                                                                }
                                                                service.combinedData.account = service.accountData.results[0];
                                                                service.combinedData.portfolio = service.portfolioInfo;
                                                                service.combinedData.user = service.user;


                                                                // console.log(service.symbols);
                                                                // console.log(service.allInitialInvestmentsValues);
                                                                // console.log(service.allCurrentInvestmentValues);
                                                                console.log(service.combinedData);
                                                                if (service.build_charts == true) {
                                                                        service.buildGraphs();
                                                                        service.build_charts = false
                                                                }
                                                                dialogService.closeDialog();


                                                        }).then(function () {
                                                                console.log('done');
                                                                service.currentGainer;
                                                                service.currentLoser;
                                                                var change;
                                                                var tempGain = 0;
                                                                var tempLoss = 0
                                                                for (symbol in service.symbols) {


                                                                        change = 0;
                                                                        change = service.combinedData[service.symbols[symbol]].quotes.last_trade_price - service.combinedData[service.symbols[symbol]].quotes.previous_close;
                                                                        if (change > tempGain) {
                                                                                service.currentGainer = service.combinedData[service.symbols[symbol]];
                                                                                service.currentGainer.dollar_gain = change;
                                                                                service.currentGainer.percent_gain = (change / service.combinedData[service.symbols[symbol]].quotes.last_trade_price) * 100;
                                                                                service.currentGainer.company = service.symbols[symbol];
                                                                                tempGain = change;
                                                                        }
                                                                        if (change < tempLoss) {
                                                                                service.currentLoser = service.combinedData[service.symbols[symbol]];
                                                                                service.currentLoser.dollar_loss = change;
                                                                                service.currentLoser.percent_loss = (change / service.combinedData[service.symbols[symbol]].quotes.last_trade_price) * 100;
                                                                                service.currentLoser.company = service.symbols[symbol];
                                                                                tempLoss = change;
                                                                        }

                                                                }
                                                                console.log(service.currentGainer)
                                                                console.log(service.currentLoser)
                                                        })
                                                })
                                        })




                                })
                        })
                })
        }













        if (config.params.token != undefined) {
                config = {
                        params: {
                                token: $localStorage.token
                        }
                }
                service.gatherRobinhoodData(config);
        }
        // setInterval(function(){
        //         service.gatherRobinhoodData(config);
        // }, 10000)

        service.buildGraphs = function () {
                service.colorsPie = ['#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB', '#64B5F6', '#4FC3F7', '#4DD0E1', '#4DB6AC', '#81C784', '#AED581', '#DCE775', '#FFF176', '#FFD54F', '#FFB74D', '#B71C1C', '#311B92', '#880E4F', '#311B92', '#311B92', '#0D47A1', '#01579B', '#006064', '#004D40', '#1B5E20', '#33691E', '#827717', '#F57F17', '#FF6F00', '#E65100', '#BF360C'];

                // //Radar Graph




                // service.labelsRadar = service.dataTransferService.symbols;
                service.pielabels = service.symbols;
                service.pieData = service.allCurrentInvestmentValues;
                service.polarData = [];
                service.lineData = [];


                service.colorsRadar = [{
                        backgroundColor: "rgba(33, 33, 33, .4)"
                },
                {
                        backgroundColor: "rgba(94, 236, 167, .4)"
                }]
                service.dataRadar = [
                        service.allInitialInvestmentsValues,
                        service.allCurrentInvestmentValues
                ];
                for (z = 0; z < service.pielabels.length; z++) {
                        service.polarData.push(service.allCurrentInvestmentValues[z] - service.allInitialInvestmentsValues[z]);
                }
                service.lineLabels = [];
                service.lineSeries = ['Portfolio'];
                for (n = 0; n < service.historicalPortfolio.length; n++) {
                        service.lineData.push(service.historicalPortfolio[n]);
                        var date = $filter('date')(service.historicalPortfolioLabels[n], 'shortTime')
                        service.lineLabels.push(date);
                }





                // for (symbol in service.symbols) {
                //         service.lineSeries.push(service.symbols[symbol])
                //         service.lineData.push([]);
                //         for (v = 0; v < service.combinedData[service.symbols[symbol]].historicals.fiveMinuteDay.length; v++) {
                //                 service.lineData[symbol].push(service.historicalPortfolio[v]);
                //                 if (symbol === '1') {
                //                         var date = $filter('date')(service.combinedData[service.symbols[symbol]].historicals.fiveMinuteDay[v].begins_at, 'mediumDate')
                //                         service.lineLabels.push(date);
                //                 }
                //         }
                // }



                var tooltipLabels = ['Initial Value: $', 'Current Value: $']
                service.optionsRadar = {
                        animation: {
                                duration: 3000,
                                easing: 'easeInOutQuint'
                        },
                        maintainAspectRatio: true,

                        tooltips: {

                                callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                                        label: function (tooltipItem, data) {
                                                // console.log(data)
                                                return tooltipLabels[tooltipItem.datasetIndex] + $filter('number')(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index], 2);
                                        }
                                }

                        },
                };
                service.optionsPolar = {
                        animation: {
                                duration: 3000,
                                easing: 'easeInOutQuart'
                        },
                        scales: {
                                yAxes: [
                                        {
                                                id: 'y-axis-1',
                                                type: 'linear',
                                                display: false,
                                                position: 'left'
                                        }
                                ]
                        },
                        maintainAspectRatio: true,
                        tooltips: {

                                callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                                        label: function (tooltipItem, data) {
                                                // console.log(tooltipItem)
                                                return data.labels[tooltipItem.index] + ': $' + $filter('number')(data.datasets[0].data[tooltipItem.index], 2) + ' gain since purchase';
                                        }
                                }

                        }
                };
                service.optionsDoughnut = {
                        animation: {
                                duration: 3000,
                                easing: 'easeInOutSine'
                        },
                        tooltips: {

                                callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                                        label: function (tooltipItem, data) {
                                                return data.labels[tooltipItem.index] + ': $' + $filter('number')(data.datasets[0].data[tooltipItem.index], 2) + ' | ' + $filter('number')((data.datasets[0].data[tooltipItem.index] / service.accountEquity) * 100, 2) + "%";
                                        }
                                }

                        },
                };


        }//end function

        service.getPortfolioToday = function () {
                config.params.userID = service.accountData.results[0].account_number;
                var portfolioPromise = httpService.getPortfolioToday(config);
                portfolioPromise.then(function (result) {
                        console.log(result);
                        service.createLineData(result, 'shortTime')

                })
        }
        service.getPortfolioWeek = function () {
                config.params.userID = service.accountData.results[0].account_number;
                var portfolioPromise = httpService.getPortfolioWeek(config);
                portfolioPromise.then(function (result) {
                        service.createLineData(result, 'short')

                })
        }
        service.getPortfolioYear = function () {
                config.params.userID = service.accountData.results[0].account_number;
                var portfolioPromise = httpService.getPortfolioYear(config);
                portfolioPromise.then(function (result) {
                        console.log(result);
                        service.createLineData(result, 'shortDate')

                })
        }
        service.getPortfolioAll = function () {
                config.params.userID = service.accountData.results[0].account_number;
                var portfolioPromise = httpService.getPortfolioAll(config);
                portfolioPromise.then(function (result) {
                        console.log(result);
                        service.createLineData(result, 'shortDate')
                })
        }

        service.createLineData = function (result, timeFormat) {
                service.historicalPortfolio = [];
                service.historicalPortfolioLabels = [];
                for (j = 0; j < result.equity_historicals.length; j++) {
                        service.historicalPortfolio.push(result.equity_historicals[j].adjusted_close_equity);
                        service.historicalPortfolioLabels.push(result.equity_historicals[j].begins_at);
                }
                service.lineLabels = [];
                service.lineData = [];
                service.lineSeries = ['Portfolio'];
                for (n = 0; n < service.historicalPortfolio.length; n++) {
                        service.lineData.push(service.historicalPortfolio[n]);
                        var date = $filter('date')(service.historicalPortfolioLabels[n], timeFormat)
                        service.lineLabels.push(date);
                }
                var begin = parseInt(result.equity_historicals[0].adjusted_close_equity, 10);
                var end = parseInt(result.equity_historicals[result.equity_historicals.length - 1].adjusted_close_equity, 10);
                if (begin < end) {
                        service.colorsLine = [
                                "#5bda90"
                        ]
                }
                else {
                        service.colorsLine = [
                                "#ff766c"
                        ]
                }
                service.changePercent = ((end - begin) / begin) * 100;
                service.changeDollar = (end - begin)

        }


}])

