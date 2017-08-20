angular.module('stockQuotesApp').service('httpService', ['$firebaseObject', '$http', '$localStorage', '$state', function ($firebaseObject, $http, $localStorage, $state) {


    var service = this;
    console.log('HTTP Service')

    service.getFirebaseData = function () {
        service.ref = new Firebase("https://coin-9681c.firebaseio.com");
        service.data = $firebaseObject(service.ref);
        return service.data;
    }

    service.getQuote = function (config) {
        return $http.get('/quote', config).then(function (response) {
            return response.data;

        });
    }

    service.postUserInfoForToken = function (config) {
        return $http({
            method: 'POST',
            url: '/token',
            headers: { 'Content-Type': 'application/json' },
            data: {
                username: config.params.username,
                password: config.params.password
            }

        })







        // $http.post('/token', config).then(function(response){
        //     console.log(response);
        //     return response.data;

        // });
    }
    service.getTokenWithMFA = function (config) {
        return $http.get('/tokenWithMFA', config).then(function (response) {
            return response.data;

        });
    }
    service.getAccountInfo = function (config) {
        return $http.get('/accountInfo', config).then(function (response) {
            return response.data;

        });
    }
    service.getPositions = function (config) {
        return $http.get('/positions', config).then(function (response) {
            return response.data;

        });
    }

    service.getInstruments = function (config) {
        return $http.get('/instrumentsData', config).then(function (response) {
            return response.data;

        });
    }

    service.getAllQuotes = function (config) {
        return $http.get('/allQuotes', config).then(function (response) {
            return response.data;

        });
    }



    service.getUserData = function (config) {
        return $http.get('/getUserData', config).then(function (response) {
            return response.data;

        });
    }

    service.getFundamentals = function (config) {
        return $http.get('/fundamentals', config).then(function (response) {
           return response.data;

        });
    }

    service.getHistoricals = function (config) {
        return $http.get('/historicals', config).then(function (response) {
            return response.data;

        });
    }

    service.getAccount = function (config) {
        return $http.get('/account', config).then(function (response) {
            return response.data;

        });
    }

    service.getHistoricalsDay = function (config) {
        return $http.get('/getHistoricalsDay', config).then(function (response) {
            return response.data;

        });
    }

    service.getHistoricalsWeek = function (config) {
        return $http.get('/getHistoricalsWeek', config).then(function (response) {
            return response.data;

        });
    }
    service.getHistoricalsYear = function (config) {
        return $http.get('/getHistoricalsYear', config).then(function (response) {
            return response.data;

        });
    }
}])