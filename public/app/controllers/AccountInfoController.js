angular.module('stockQuotesApp').controller('AccountInfoController', ['$scope', '$http', '$timeout', '$mdDialog', 'httpService', 'dataTransferService', '$localStorage', '$state', 'dialogService', function($scope, $http, $mdMedia, $mdDialog, httpService, dataTransferService, $localStorage, $state, dialogService){
        $scope.httpService = httpService;

        $scope.dataTransferService = dataTransferService;
        $scope.dialogService = dialogService;

        $scope.companies = [];

        
        $scope.getFundamentals = function(company, info){
                $mdDialog.show({
                        locals: {company: company, info: info},
                        controller: 'fundamentalsController',
                        templateUrl:'app/dialogs/fundamentals/fundamentals-dialog.view.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true
                })
        }

        if($localStorage.token == undefined)
        {
                console.log('No token found, sending to login screen');
                dialogService.closeDialog();
                $state.go('splash');
        }

        

}]);