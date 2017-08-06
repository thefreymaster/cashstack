angular.module('stockQuotesApp').controller('AccountGraphsController', ['$scope', 'dataTransferService', 'mediaService', function($scope, dataTransferService, mediaService){
        $scope.dataTransferService = dataTransferService;
        $scope.mediaService = mediaService;

        // $scope.colorsPie = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#4CAF50', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548'];
    
        // // //Radar Graph

        // $scope.radarlabels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

        // $scope.radarData = [
        //     [65, 59, 90, 81, 56, 55, 40],
        //     [28, 48, 40, 19, 96, 27, 100]
        // ];



        // // $scope.labelsRadar = $scope.dataTransferService.symbols;
        // $scope.pielabels = $scope.dataTransferService.symbols;
        // $scope.pieData = $scope.dataTransferService.allInitialInvestmentsValues;


        // $scope.colorsRadar = [{
        //     backgroundColor: "rgba(33, 33, 33, .4)"
        // },
        // {
        //     backgroundColor: "rgba(0, 230, 118, .4)"
        // }]
        // $scope.dataRadar = [
        //     $scope.dataTransferService.allInitialInvestmentsValues,
        //     $scope.dataTransferService.allCurrentInvestmentValues
        // ];


        console.log($scope.pielabels)

}]);