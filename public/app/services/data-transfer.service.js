

angular.module('stockQuotesApp').service('dataTransferService', ['$http', '$localStorage', '$state', 'httpService', 'dialogService', '$filter', function($http, $localStorage, $state, httpService, dialogService, $filter){

    
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







    service.gatherRobinhoodData = function(config){
        config = {
                params: {
                        token: $localStorage.token
                }
        }
        var accountInfoPromise = httpService.getAccountInfo(config);
        accountInfoPromise.then(function (results){
                service.accountEquity = results.results[0].equity;
                //     console.log(service.accountEquity);

        })

        
        var positionPromise = httpService.getPositions(config);
        positionPromise.then(function (results){
                // service.positions = results.results;
                //     console.log(service.positions);
                service.instruments = [];
                service.positions = [];
                for(j=0;j<results.results.length;j++)
                {
                        if(results.results[j].quantity != 0)   
                        {
                                service.positions.push(results.results[j])
                                service.instruments.push(results.results[j].instrument);
                        }
                }


                // console.log(service.instruments)
        }).then(function(){
                // config.params.instrumentUrl = service.position;
                config.params.collection = service.instruments;
                var instrumentsPromise = httpService.getInstruments(config);
                instrumentsPromise.then(function(result){
                        service.instrumentData = result;
                        service.symbols = [];
                        service.symbolsJoined = [];
                        service.combinedData = {};
                        

                        for(g=0;g<service.positions.length;g++)
                        {            
                                if(service.positions[g].quantity != 0)   
                                {
                                        service.symbols.push(service.instrumentData[g].symbol);
                                        service.symbolsJoined.push(service.instrumentData[g].symbol);
                                }
                                
                        }
                        service.symbolsJoined.join();
                        config.params.symbols = service.symbolsJoined;
                        var allQuotesPromise = httpService.getAllQuotes(config);
                        allQuotesPromise.then(function(result){
                                service.quotes = result.results;
                                // console.log(service.quotes);
                                k=0;

                                for(symbol in service.symbols)
                                {

                                
                                        service.combinedData[service.symbols[k]] = {
                                                        positions: service.positions[k],
                                                        instruments: service.instrumentData[k],
                                                        quotes: service.quotes[k]
                                                }
                                        
                                        
                                        if(service.positions[k].quantity != 0)
                                        {
                                                service.allInitialInvestmentsValues.push(service.positions[k].average_buy_price*service.positions[k].quantity)
                                                service.allCurrentInvestmentValues.push(service.quotes[k].last_trade_price*service.positions[k].quantity)
                                        }
                                        k++
                                }

                                                console.log(service.symbols);
                                                console.log(service.allInitialInvestmentsValues);
                                                console.log(service.allCurrentInvestmentValues);
                                                service.buildGraphs();
                                                dialogService.closeDialog();


                        })

                }) 
        })
    }
        if(config.params.token != undefined)
        {
                config = {
                        params: {
                                token: $localStorage.token
                        }
                }
                service.gatherRobinhoodData(config);
        }


        service.buildGraphs = function(){
                service.colorsPie = ['#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB', '#64B5F6', '#4FC3F7', '#4DD0E1', '#4DB6AC', '#81C784', '#AED581', '#DCE775', '#FFF176', '#FFD54F', '#FFB74D'];

                // //Radar Graph

                service.radarlabels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

                service.radarData = [
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
                ];



                // service.labelsRadar = service.dataTransferService.symbols;
                service.pielabels = service.symbols;
                service.pieData = service.allCurrentInvestmentValues;
                service.polarData=[]

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
                for(z=0;z<service.pielabels.length;z++)
                {
                        service.polarData.push(service.allCurrentInvestmentValues[z]-service.allInitialInvestmentsValues[z]);
                }

                var tooltipLabels = ['Initial Value: $', 'Current Value: $']
                service.optionsRadar = {
                        animation: {
                        duration: 3000,
                        easing: 'easeInOutQuint'
                        },
                        tooltips: {

                        callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                                label: function (tooltipItem, data) {
                                console.log(data)
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
                        maintainAspectRatio: false,
                        tooltips: {

                        callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                                label: function (tooltipItem, data) {
                                console.log(tooltipItem)
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
                                return data.labels[tooltipItem.index] + ': $' + $filter('number')(data.datasets[0].data[tooltipItem.index], 2);
                                }
                        }

                        },
                };
            }//end function


}])

