angular.module('stockQuotesApp').controller('StockQuotesController', ['$scope', '$firebaseObject', '$http', '$timeout', 'appDataService', '$state', '$window', '$location', 'httpService', 'dataTransferService', function($scope, $firebaseObject, $http, $timeout, appDataService, $state, $window, $location, httpService, dataTransferService){
    $scope.service = appDataService;
    $scope.httpService = httpService;
    $window.ga('send', 'pageview', 'report');
    
    $scope.dataTransferService = dataTransferService;
    



    
}]);