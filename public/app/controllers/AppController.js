angular.module('stockQuotesApp').controller('AppController', ['$scope', '$http', '$timeout', 'appDataService', '$state', '$window', '$mdDialog', '$mdMedia', '$mdSidenav', '$location', 'dataTransferService', function($scope, $http, $timeout, appDataService, $state, $window, $mdDialog, $mdMedia, $mdSidenav, $location, dataTransferService){
        $scope.service = appDataService;








        $scope.backToReport = function(){
                appDataService.freshLoad = false;
                $state.go('report');

        }
        $scope.refreshApp = function(){
                $window.location.reload();
        }

        $scope.$mdMedia = $mdMedia;

        $scope.screenIsExtraSmall = $mdMedia('xs');
        $scope.screenIsSmall = $mdMedia('sm');
        $scope.screenIsMedium = $mdMedia('md');
        $scope.screenIsLarge = $mdMedia('lg');

        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
        return function() {
                $mdSidenav(componentId).toggle();
        };
        }





}]);