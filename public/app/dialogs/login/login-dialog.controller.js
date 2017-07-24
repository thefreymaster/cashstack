angular.module('stockQuotesApp').controller('loginController', function($scope, $http, httpService, $localStorage, dialogService, $state, dataTransferService){
    $scope.httpService = httpService;
    $scope.dialogService = dialogService;
    $scope.dataTransferService = dataTransferService;
    
    $scope.config = {
        params: {
            username: '',
            password: ''
        }
    }
    $scope.loading = false;
    $scope.showMFAinput = false;
    $scope.getTokenFromService = function(config){
        $scope.loading = true;
        var tokenResponse = $scope.httpService.postUserInfoForToken(config);
        tokenResponse.then(function(response){
            if(response.data.mfa_required == true)
            {
                $scope.showMFAinput = true;
            }
            else{
                $scope.dataTransferService.gatherRobinhoodData();
                $localStorage.token = response.token;
            }
            $scope.loading = false;
        })

    }
    $scope.getTokenFromServiceMFA = function(config){

        var tokenResponse = $scope.httpService.getTokenWithMFA(config);
        tokenResponse.then(function(response){
            $localStorage.token = response.token;
            $scope.dialogService.closeDialog();
                        $scope.dataTransferService.gatherRobinhoodData();
                        $state.go('report');

        })

    }

});