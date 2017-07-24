angular.module('stockQuotesApp').component('winLose', {
        templateUrl: 'app/components/winLose/winLose.view.html',
        controller: 'winLoseController',
        bindings: {
            type: '<'
        }
    });