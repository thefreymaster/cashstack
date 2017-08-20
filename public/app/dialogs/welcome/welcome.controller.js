angular.module('stockQuotesApp').controller('welcomeController', function($scope, $http, httpService, $localStorage, dialogService, $state, dataTransferService){
    $scope.httpService = httpService;
    $scope.dialogService = dialogService;
    $scope.dataTransferService = dataTransferService;
    


});