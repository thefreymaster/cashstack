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
    service.showWelcomeDialog = function(){
        return $mdDialog.show({
            controller: 'welcomeController',
            templateUrl: 'app/dialogs/welcome/welcome-dialog.view.html',
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
    service.showUnsecureDialog = function(){
        return $mdDialog.show({
            templateUrl: 'app/dialogs/unsecure/unsecure-dialog.view.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        })
    }
    service.closeDialog = function(){
        return $mdDialog.hide();
    }

}])