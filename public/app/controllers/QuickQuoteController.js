angular.module('stockQuotesApp').controller('QuickQuoteController', ['$scope', '$http', '$timeout', 'appDataService', '$window', '$state', function($scope, $http, $timeout, appDataService, $window, $state){
        $scope.service = appDataService;
        $scope.allStockData = appDataService;
        $scope.autoFillObject;
        appDataService.freshLoad = false;

        if(appDataService.data.$resolved ==  false)
        {
            appDataService.freshLoad = true;
            $state.go('report');
        }



        $window.ga('send', 'pageview', 'quickQuote');

        //console.log("WinnerLoserController: " + $scope.allStockData);
        $scope.placeHolder;
        $scope.closestMatch;
        $scope.limit = 10;
        $scope.selectedAStock = false;

        $scope.fetchValidTickers = function(){
                var url = 'https://vg82ksjgm3.execute-api.us-east-1.amazonaws.com/GoogleFinanceTickerValidationAPI/'+$scope.user.ticker;



                var string = [];
        $http({
                method: 'GET',
                url: url,
                transformResponse: []
                }).then(function successCallback(response) {
                        var parsedData = JSON.parse(response.data);
                        // console.log(parsedData.matches);
                        $scope.autoFillObject = parsedData.matches;
                        //console.log($scope.autoFillObject);

                        //$scope.closestMatch = $scope.autoFillObject[0].t;
                        console.log($scope.closestMatch);
                }, function errorCallback(response) {
                        console.log(response)

                });
        }


        $scope.fetchCurrentStockPrice = function(company, index){
            $scope.selectedCompany = company;
            $scope.selectedAStock = true;
            $scope.allStockData;
            
        var url = 'https://3glora1z4i.execute-api.us-east-1.amazonaws.com/GoogleFinanceAPI/'+$scope.autoFillObject[index].t;

        var string = [];
            $http({
                method: 'GET',
                url: url,
                transformResponse: []
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    string = response.data.substring(4, response.data.length);

                    var responseObject = JSON.parse(string);
                    $scope.allStockData = responseObject;
                    console.log($scope.allStockData);


                    //$scope.data[appDataService.accountCode].Cash = '2000';


                    //console.log(appDataService.accountValue);
                }, function errorCallback(response) {
                    console.log(response)

                });
            }
        
        




//-----------


//----------























}]);