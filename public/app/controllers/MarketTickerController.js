



angular.module('stockQuotesApp').controller('MarketTickerController', ['$scope', '$http', '$timeout', 'appDataService', 'moment', '$mdSidenav', '$localStorage', '$state', 'dataTransferService', '$window', function($scope, $http, $timeout, appDataService, moment, $mdSidenav, $localStorage, $state, dataTransferService, $window){
        $scope.service = appDataService;
        $scope.dataTransferService = dataTransferService;

        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');
        
        $scope.protocol = $window.location.protocol;

        function buildToggler(componentId) {
        return function() {
                $mdSidenav(componentId).toggle();
        };
        }



        $scope.logout = function(){
                $localStorage.$reset();
                console.log($localStorage);
                $state.go('splash');
        }

      
}]);















