angular.module('stockQuotesApp').controller('tickerController', ['$scope', '$http', '$timeout', 'appDataService', function($scope, $http, $timeout, appDataService){
    var controller = this;
    controller.httpService = httpService;

    controller.quotes = [];

    controller.quotes.push(controller.httpService.getQuote(config));
                
}]);