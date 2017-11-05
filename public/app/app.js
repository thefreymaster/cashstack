var app = angular.module('stockQuotesApp', ['ui.router', 'firebase', 'ngMaterial', 'ngStorage', 'ngMessages', 'angularMoment', 'chart.js', 'countUpModule']).config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider, ChartJsProvider){


$httpProvider.defaults.headers.post['Content-Type'] = 'text/plain'; 

$mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('red')
    .dark();

    

$stateProvider.state('report', {
                url: '/',
                views: {
                    'statusBar': {
                        templateUrl: "app/views/marketTicker.html",
                        controller: 'MarketTickerController'
                    },
                    'winnerLoser': {
                        templateUrl: "app/views/winnerLoser.html",
                        controller: 'WinnerLoserController'
                    },
                    'stockQuotes': {
                        templateUrl: "app/views/stockQuotes.html",
                        controller: 'StockQuotesController'
                    },
                    'accountInfo': {
                        templateUrl: "app/views/accountInfo.html",
                        controller: 'AccountInfoController'
                    },
                    'accountGraphs': {
                        templateUrl: "app/views/accountGraphs.html",
                        controller: 'AccountGraphsController'
                    }
                }
            })

$stateProvider.state('quickQuote', {
                url: '/quickQuote',
                views: {
                    'statusBar': {
                        templateUrl: "app/views/settingsBackBar.html"
                    },
                    'stockQuotes': {
                        templateUrl: "app/views/quickQuote.html",
                        controller: 'QuickQuoteController'
                    }
                }
            })     

$stateProvider.state('graphs', {
                url: '/graphs',
                views: {
                    'statusBar': {
                        templateUrl: "app/views/settingsBackBar.html"
                    },
                    'stockQuotes': {
                        templateUrl: "app/views/graphs.html",
                        controller: 'GraphsController'
                    }
                }
            })   
$stateProvider.state('splash', {
                url: '/splash',
                views: {
                    'accountInfo': {
                        templateUrl: "app/views/splash.html",
                        controller: 'SplashController'
                    }
                }
            })

$stateProvider.state('settings', {
                url: '/settings',
                views: {
                    'statusBar': {
                        templateUrl: "app/views/settingsBackBar.html"
                    },
                    'accountInfo': {
                        templateUrl: "app/views/settings.html",
                        controller: 'SettingsController'
                    }                
                }
            })            

  $urlRouterProvider.otherwise('/splash');

}).run(function($window, $rootScope, $location){
    $window.ga('create', 'UA-40570108-2', 'auto');

});


