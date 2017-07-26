

angular.module('stockQuotesApp').service('mediaService', ['$mdMedia', function($mdMedia){

    
    var service = this;

    service.screenIsExtraSmall = $mdMedia('xs');
    service.screenIsSmall = $mdMedia('sm');
    service.screenIsMedium = $mdMedia('md');
    service.screenIsLarge = $mdMedia('lg');
    service.screenIsExtraLarge = $mdMedia('xl');



 
}])

