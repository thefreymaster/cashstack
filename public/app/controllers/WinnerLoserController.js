angular.module('stockQuotesApp').controller('WinnerLoserController', ['$scope', '$http', '$timeout', 'appDataService', 'httpService', '$localStorage', 'dataTransferService', function($scope, $http, $timeout, appDataService, httpService, $localStorage, dataTransferService){
        $scope.service = appDataService;
        $scope.allStockData = appDataService;
        $scope.dataTransferService = dataTransferService;





        //console.log("WinnerLoserController: " + $scope.allStockData);





}]);