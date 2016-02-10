(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .when('/', '/dashboard')
                .otherwise('/dashboard');


            $stateProvider.state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html'
            });

        }]
    );

})(); 