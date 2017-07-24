angular.module('stockQuotesApp').service('dialogService', ['$http', '$localStorage', '$state', '$mdDialog', function($http, $localStorage, $state, $mdDialog){

    
    var service = this;

    service.showLoginDialog = function(){
        return $mdDialog.show({
            controller: 'loginController',
            templateUrl: 'app/dialogs/login/login-dialog.view.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        })
    }
    service.showLoadingDialog = function(){
        return $mdDialog.show({
            controller: 'loadingController',
            templateUrl: 'app/dialogs/loading/loading-dialog.view.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        })
    }
    service.closeDialog = function(){
        return $mdDialog.hide();
    }

}])