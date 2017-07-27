angular.module('stockQuotesApp').controller('SettingsController', ['$scope', '$http', '$timeout', 'appDataService', '$firebaseObject', '$state', '$mdDialog', '$localStorage', '$mdSidenav', '$window', 'dataTransferService', function($scope, $http, $timeout, appDataService, $firebaseObject, $state, $mdDialog, $localStorage, $mdSidenav, $window, dataTransferService){
        $scope.service = appDataService;
        $scope.allStockData = appDataService;
        $scope.dataTransferService = dataTransferService;


        $window.ga('send', 'pageview', 'settings');


        appDataService.freshLoad = false;
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
        return function() {
                $mdSidenav(componentId).toggle();
        };
    }
        // $scope.toggleLeft();


        $scope.data = appDataService.data;
        var syncObject = $firebaseObject(appDataService.ref);
        syncObject.$bindTo($scope, "data");

        $scope.data.$loaded().then(function(){
                $scope.data.Cash = 2300;
                $scope.version = appDataService.data.currentVersion;

        })  
        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete your account?')
                .textContent("Once it's gone, it's gone.")
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                delete $scope.data[appDataService.accountCode];
                delete $localStorage.accountCode;
                delete $localStorage.submittedFirstStock;
                appDataService.accountCode = '';
                appDataService.returningUser = false;
                appDataService.submittedFirstStock = false;
                appDataService.accountJustDeleted = true;

                $state.go('splash');
            }, function() {
                $scope.status = 'canceled';
            });
        };
        $scope.showConfirmAccountLookup = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
            .title('What is your old five digit account code?')
            .textContent('Your old code will replace all the current data of your current account.')
            .placeholder('23232')
            .targetEvent(ev)
            .ok('Submit')
            .cancel('Cancel');

            $mdDialog.show(confirm).then(function(result) {
                appDataService.accountCode = result;
                delete $localStorage.accountCode;
                
                $localStorage.accountCode = appDataService.accountCode;
                $state.reload();
                $state.go('report');
                $window.location.reload();


            }, function() {
            $scope.status = 'You didn\'t name your dog.';
            });
        };







}]);