angular.module('stockQuotesApp').controller('fundamentalsController', function($scope, $http, company, info, httpService, dialogService, $filter, mediaService){
    $scope.company = company;
    $scope.info = info;
    $scope.httpService = httpService;
    $scope.dialogService = dialogService;
    $scope.mediaService = mediaService;
    
    var config = {
        params: {
            symbol: $scope.company
        }
    }

    var quotePromise = $scope.httpService.getFundamentals(config);
    quotePromise.then(function(response){
        $scope.fundamentals = response;
    });

    $scope.colours = ['rgba(21,203,97,.4)'];



    var historicalPromise = $scope.httpService.getHistoricals(config);
    historicalPromise.then(function(response){
        $scope.historicalData = response;
        $scope.data = [];
        $scope.labels = [];
        $scope.max = 0;
        for(d=0;d<$scope.historicalData.historicals.length;d++)
        {
            $scope.data.push($scope.historicalData.historicals[d].close_price);
            $scope.labels.push($filter('date')($scope.historicalData.historicals[d].begins_at, "dd-MM-yyyy"));
            if($scope.historicalData.historicals[d].close_price > $scope.max)
            {
                $scope.max = $scope.historicalData.historicals[d].close_price;
            }
        }
        $scope.maxNum = Number($scope.max);
        $scope.maxNum = $scope.maxNum+60;
        $scope.maxNum = $filter('number')($scope.maxNum, 0);
        $scope.maxNum = Number($scope.maxNum);
        $scope.maxNum = Math.round($scope.maxNum / 10) * 10


        $scope.series = ['Series A', 'Series B'];


        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        display: true,
                        type: 'linear',
                        position: 'left',
                        ticks: { min: 0, max: $scope.maxNum}
                    }
                ]
            },
                    animation: {
                duration: 3000,
                easing: 'easeInOutCubic'
            },
            tooltips: {

                callbacks: { // HERE YOU CUSTOMIZE THE LABELS
                    title: function (tooltipItem, data) {
                        // console.log(tooltipItem)
                        var daysAgo = data.labels[tooltipItem[0].index];
                        return 'Value on ' + daysAgo;
                    },
                    label: function (tooltipItem, data) {
                        return '$' + data.datasets[0].data[tooltipItem.index];
                    }
                }

            },
        };



        // $scope.series = ['Stock Value'];
        // console.log($scope.max);
        // $scope.options = {
        //     scales: {
        //         yAxes: [
        //             {
        //                 id: 'y-axis-1',
        //                 display: true,
        //                 type: 'linear',
        //                 position: 'left',
        //                 ticks: { min: 0, max: $scope.maxNum}
        //             }
        //         ]
        //     },
        //     animation: {
        //         duration: 3000,
        //         easing: 'easeInOutCubic'
        //     },
        //     tooltips: {

        //         callbacks: { // HERE YOU CUSTOMIZE THE LABELS
        //             title: function (tooltipItem, data) {
        //                 // console.log(tooltipItem)
        //                 var daysAgo = data.labels[tooltipItem[0].index];
        //                 return 'Value on ' + daysAgo;
        //             },
        //             label: function (tooltipItem, data) {
        //                 return '$' + data.datasets[0].data[tooltipItem.index];
        //             }
        //         }

        //     },
        // };
    })



});