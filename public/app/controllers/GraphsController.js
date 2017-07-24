angular.module('stockQuotesApp').controller('GraphsController', ['$scope', '$http', '$timeout', 'appDataService', '$state', function ($scope, $http, $timeout, appDataService, $state) {
    $scope.service = appDataService;
    $scope.allStockData = appDataService;





    $scope.optionsDoughnut = {
        animation: {
            duration: 3000,
            easing: 'easeInOutSine'
        },
        tooltips: {

            callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                label: function (tooltipItem, data) {
                    return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + '%';
                }
            }

        },
    };
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }
            ]
        },
        animation: {
            duration: 3000,
            easing: 'easeInOutCubic'
        },
        maintainAspectRatio: false,
        tooltips: {

            callbacks: { // HERE YOU CUSTOMIZE THE LABELS
                title: function (tooltipItem, data) {
                    // console.log(tooltipItem)
                    var daysAgo = data.labels[tooltipItem[0].index];
                    return 'Account value ' + daysAgo + ' visits ago';
                },
                label: function (tooltipItem, data) {
                    return '$' + data.datasets[0].data[tooltipItem.index];
                }
            }

        },
    };
    var tooltipLabels = ['Initial Value: $', 'Current Value: $']
    $scope.optionsBar = {
        animation: {
            duration: 3000,
            easing: 'easeInOutExpo'
        },
        tooltips: {

            callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                label: function (tooltipItem, data) {
                    return tooltipLabels[tooltipItem.datasetIndex] + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }
            }

        },
    };
    $scope.optionsPolar = {
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
                    return data.labels[tooltipItem.index] + ': $' + data.datasets[0].data[tooltipItem.index] + ' gain since purchase';
                }
            }

        }
    };

    var tooltipLabels = ['Initial Value: $', 'Current Value: $']
    $scope.optionsRadar = {
        animation: {
            duration: 3000,
            easing: 'easeInOutQuint'
        },
        tooltips: {

            callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                label: function (tooltipItem, data) {
                    console.log(data)
                    return tooltipLabels[tooltipItem.datasetIndex] + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }
            }

        },
    };














    //console.log("WinnerLoserController: " + $scope.allStockData);
    // console.log(appDataService.data);
    // console.log(appDataService.accountCode);

    appDataService.freshLoad = false;

    if (appDataService.data.$resolved == false) {
        appDataService.freshLoad = true;
        $state.go('report');
    }
    else {


        $scope.colors = [{
            backgroundColor: "rgba(33, 33, 33, .5)",
            hoverBackgroundColor: "rgba(33, 33, 33, .9)",
            borderColor: "rgba(66, 66, 66, .4)",
            hoverBorderColor: "rgba(66, 66, 66, .4)"
        },
        {
            backgroundColor: "rgba(0, 230, 118, .5)",
            hoverBackgroundColor: "rgba(0, 230, 118, .9)",
            borderColor: "rgba(66, 66, 66, .4)",
            hoverBorderColor: "rgba(66, 66, 66, .4)"
        }];
        $scope.colorsLine = [
            {
                backgroundColor: "rgba(33, 33, 33, .6)",
                hoverBackgroundColor: "rgba(33, 33, 33, .8)",
                borderColor: "rgba(66, 66, 66, .4)",
                hoverBorderColor: "rgba(66, 66, 66, .4)"
            }];

        var accountValue = [];
        var accountLabels = [];
        var forloopIndex;
        if(appDataService.data[appDataService.accountCode].PreviousLoadAccountValue.length < 45)
        {
            forloopIndex = 0;
        }
        else{
            forloopIndex = appDataService.data[appDataService.accountCode].PreviousLoadAccountValue.length-45;
        }
        for (r = forloopIndex; r < appDataService.data[appDataService.accountCode].PreviousLoadAccountValue.length; r++) {
            accountValueRounded = appDataService.data[appDataService.accountCode].PreviousLoadAccountValue[r].toFixed(2);
            accountValue.push(accountValueRounded);
            accountLabels.push(r);
        }
        var accountLabelsReverse = [];
        for (var i = accountValue.length; i--;) {
            accountLabelsReverse.push(i + 1);
        }

        $scope.labels = accountLabelsReverse;
        $scope.series = ['Account Value'];
        $scope.data = [accountValue];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };


        //pie graph code
        $scope.colorsDoughnut = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#4CAF50', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548'];

        // $scope.colorsDoughnut = [{
        //     backgroundColor: "rgba(244, 67, 54,1.0)"
        // },
        // {
        //     backgroundColor: "rgba(233, 30, 99,1.0)"
        // },
        // {
        //     backgroundColor: "rgba(156, 39, 176,1.0)"
        // },
        // {
        //     backgroundColor: "rgba(103, 58, 183,1.0)"
        // }, 
        // {
        //     backgroundColor: "rgba(63, 81, 181,1.0)"
        // }, 
        // {
        //     backgroundColor: "rgba(3, 169, 244,1.0)"
        // }, 
        // {
        //     backgroundColor: "rgba(0, 188, 212,1.0)"
        // }, 
        // {
        //     backgroundColor: "rgba(0, 150, 136,1.0)"
        // }, 
        // {
        //     backgroundColor: "rgba(76, 175, 80,1.0)"
        // },
        // {
        //     backgroundColor: "rgba(255, 235, 59,1.0)"
        // },
        //  {
        //     backgroundColor: "rgba(255, 193, 7,1.0)"
        // },    
        //  {
        //     backgroundColor: "rgba(255, 87, 34,1.0)"
        // }, 
        //                 ];




























        $scope.stockLabelNames = [];
        var stockLabelTickers = [];

        var stockValues = [];
        $scope.stockPercents = [];
        var initialValues = [];
        $scope.stockShares = [];
        $scope.dollarGain = [];
        $scope.percentGain = [];
        for (var key in appDataService.data[appDataService.accountCode].StockInfo) {
            $scope.stockShares.push(appDataService.data[appDataService.accountCode].StockInfo[key].Shares);
            stockLabelTickers.push(key);
            $scope.stockLabelNames.push(appDataService.data[appDataService.accountCode].StockInfo[key].CompanyName);
            percentStockValue = appDataService.data[appDataService.accountCode].StockInfo[key].CurrentInvestmentValue / appDataService.accountValue;
            percentStockValue = percentStockValue * 100;


            $scope.dollarGain.push(appDataService.data[appDataService.accountCode].StockInfo[key].DollarGainTotal.toFixed(2));

            $scope.percentGain.push(appDataService.data[appDataService.accountCode].StockInfo[key].PercentGainTotal.toFixed(2));

            percentStockValue = percentStockValue.toFixed(2)
            $scope.stockPercents.push(percentStockValue);

            stockValuesRounded = appDataService.data[appDataService.accountCode].StockInfo[key].CurrentInvestmentValue;
            stockValuesRounded = stockValuesRounded.toFixed(2)
            stockValues.push(stockValuesRounded);

            intialValueRounded = appDataService.data[appDataService.accountCode].StockInfo[key].InitialInvestment;
            intialValueRounded = intialValueRounded.toFixed(2)
            initialValues.push(intialValueRounded);
        }
        $scope.labelsDoughnut = $scope.stockLabelNames;
        $scope.dataDoughnut = $scope.stockPercents;



        //bar graph code


        $scope.labelsBar = stockLabelTickers;
        $scope.seriesBar = ['Initial Value', 'Current Value'];

        $scope.dataBar = [
            initialValues,
            stockValues
        ];

        //radar
        $scope.colorsRadar = [{
            backgroundColor: "rgba(33, 33, 33, .4)"
        },
        {
            backgroundColor: "rgba(0, 230, 118, .4)"
        }]



        $scope.labelsRadar = stockLabelTickers;
        $scope.seriesRadar = ['Initial Value', 'Current Value'];


        $scope.dataRadar = [
            initialValues,
            stockValues
        ];

    }
    $scope.titleText = 'Percent Value of Portfilio'
    $scope.subtitleText = 'Stock values by percentage breakdown';

    $scope.chartType;
    $scope.changeDoughnutGraph = function (type) {
        $scope.chartType = type;
        if (type === 'd') {
            $scope.titleText = 'Percent Value of Portfilio'

            $scope.subtitleText = 'Stock values by percentage breakdown';

            $scope.dataDoughnut = $scope.stockPercents;
            $scope.optionsDoughnut = {
                tooltips: {

                    callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                        label: function (tooltipItem, data) {
                            return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + '%';
                        }
                    }

                },
            };


        }
        else if (type === 's') {
            $scope.titleText = 'Shares of Portfilio'
            $scope.subtitleText = 'Stock values by shares breakdown';
            $scope.dataDoughnut = $scope.stockShares;
            $scope.optionsDoughnut = {


                tooltips: {

                    callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                        label: function (tooltipItem, data) {
                            if ($scope.chartType == 's') {
                                label = data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + ' shares';
                                console.log(label);
                                return label;
                            }
                            else{
                                label = data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + '%';
                                console.log(label);
                                return label;
                            }

                        }
                    }

                }
            };
        }
    }

    //polar graph

    $scope.labelsPolar = $scope.stockLabelNames;
    $scope.dataPolar = $scope.dollarGain;

    $scope.titleTextPolar = 'Dollar Gain'
    $scope.subtitleTextPolar = 'Current dollar gain of all stocks';

    $scope.changePolarMetric = function (type) {
        if (type == 'd') {
            $scope.titleTextPolar = 'Dollar Gain'
            $scope.subtitleTextPolar = 'Current dollar gain of all stocks';

            $scope.dataPolar = $scope.dollarGain;
            $scope.optionsPolar = {
                maintainAspectRatio: false,

                tooltips: {

                    callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                        label: function (tooltipItem, data) {
                            return data.labels[tooltipItem.index] + ': $' + data.datasets[0].data[tooltipItem.index] + ' gain since purchase';
                        }
                    }

                },
            };

        }
        else if (type == 'p') {
            $scope.titleTextPolar = 'Percent Gain'
            $scope.subtitleTextPolar = 'Current percent gain of all stocks';
            $scope.dataPolar = $scope.percentGain;
            $scope.optionsPolar = {
                maintainAspectRatio: false,

                tooltips: {

                    callbacks: { // HERE YOU CUSTOMIZE THE LABELS

                        label: function (tooltipItem, data) {
                            return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + '% gain since purchase';
                        }
                    }

                },
            };
        }
    }



    $scope.labelsSharesLine = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.serieslabelsSharesLine = ['Series A', 'Series B'];
    $scope.dataSharesLine = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];

}]);