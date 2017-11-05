app.controller('SettingsController', function (appDataService, dataTransferService, $firebaseObject) {
    var controller = this;
    this.hero;
    controller.service = appDataService;
    controller.dataTransferService = dataTransferService;
        $scope.data = appDataService.data;
        var syncObject = $firebaseObject(appDataService.ref);
        syncObject.$bindTo($scope, "data");

        $scope.data.$loaded().then(function(){
                $scope.data.Cash = 2300;
                $scope.version = appDataService.data.currentVersion;

        })  
});