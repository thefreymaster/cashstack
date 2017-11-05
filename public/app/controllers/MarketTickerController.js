



angular.module('stockQuotesApp').controller('MarketTickerController', ['$scope', '$http', '$timeout', 'appDataService', 'moment', '$mdSidenav', '$localStorage', '$state', 'dataTransferService', function($scope, $http, $timeout, appDataService, moment, $mdSidenav, $localStorage, $state, dataTransferService){
        $scope.service = appDataService;
        $scope.marketObject = {};
        $scope.markets = ['DJI','NASDAQ', 'NYSE'];
        $scope.dataTransferService = dataTransferService;

        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
        return function() {
                $mdSidenav(componentId).toggle();
        };
        }
        
        // $scope.fetchMarketData = function(){
        //         var url = 'https://3glora1z4i.execute-api.us-east-1.amazonaws.com/GoogleFinanceAPI/.DJI,.IXIC,.INX';
        //         var string = [];
        // $http({
        //         method: 'GET',
        //         url: url,
        //         transformResponse: []
        //         }).then(function successCallback(response) {
        //                 string = response.data.substring(4, response.data.length);

        //                 var responseObject = JSON.parse(string);
                        
        //                 // for(f=0; f<responseObject.length; f++)
        //                 // {
        //                 //     responseObject[f].cp = parseFloat(responseObject[f].cp);
        //                 // }

        //                 $scope.marketObject = responseObject;

        //                 //console.log("Market Object: " + $scope.marketObject)
        //                 //return $scope.marketObject[0].t
        //         }, function errorCallback(response) {
        //                 console.log(response)

        //         });

        // }  
        // $scope.fetchMarketData();

        // $scope.message = {
        //         text: 'hello world!',
        //         time: new Date()
        // };
        // $scope.dataLastUpdated = {
        //         text: 'hello world!',
        //         time: new Date()
        // };


        $scope.logout = function(){
                $localStorage.$reset();
                console.log($localStorage);
                $state.go('splash');
        }

      
}]);















