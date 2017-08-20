

angular.module('stockQuotesApp').controller('SplashController', ['$scope', '$http', '$timeout', 'appDataService', '$state', '$firebaseObject', '$localStorage', '$q', '$window', 'dialogService', function($scope, $http, $timeout, appDataService, $state, $firebaseObject, $localStorage, $q, $window, dialogService){
        $scope.service = appDataService;
        $scope.dialogService = dialogService;

        $window.ga('send', 'pageview', 'quickQuote');

        if($localStorage.token == undefined)
        {
                $scope.dialogService.showWelcomeDialog();
        }
        else{
                $state.go('report');
        }
        







}]);