angular.module('stockQuotesApp').controller('WinnerLoserController', ['$scope', 'dataTransferService', 'mediaService', function($scope, dataTransferService, mediaService){
        $scope.dataTransferService = dataTransferService;
        $scope.mediaService = mediaService;


        $scope.countUpOptions = {
          useEasing : true, 
          useGrouping : true, 
          separator : ',', 
          decimal : '.', 
          prefix : '$', 
        };


        //console.log("WinnerLoserController: " + $scope.allStockData);





}]);