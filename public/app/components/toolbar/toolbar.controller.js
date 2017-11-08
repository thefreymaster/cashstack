app.controller('ToolbarController', function (appDataService, dataTransferService, $firebaseObject, $window, $mdSidenav, mediaService) {
    var controller = this;
    this.hero;
    controller.service = appDataService;
    controller.dataTransferService = dataTransferService;
    controller.mediaService = mediaService;


    controller.service = appDataService;
    controller.dataTransferService = dataTransferService;

    controller.toggleLeft = buildToggler('left');
    controller.toggleRight = buildToggler('right');

    controller.protocol = $window.location.protocol;

    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        };
    }



    controller.logout = function () {
        $localStorage.$reset();
        console.log($localStorage);
        $state.go('splash');
    }

});