angular.module('stockQuotesApp').service('firebaseService', ['$firebaseObject', 'appDataService', function($firebaseObject, appDataService){

    
    var firebaseService = this;
    firebaseService.appDataService = appDataService;
    firebaseService.data;



}])