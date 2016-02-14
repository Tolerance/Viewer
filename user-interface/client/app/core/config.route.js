(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .when('/', '/inspector')
                .otherwise('/inspector');

            $stateProvider
                .state('layout', {
                    abstract: true,
                    views: {
                        header: {
                            templateUrl: 'app/layout/views/header.html',
                            controller: 'HeaderController'
                        }
                    }
                })
                .state('inspector', {
                    parent: 'layout',
                    url: '/inspector',
                    views: {
                        '@': {
                            controller: 'InspectorController',
                            templateUrl: 'app/inspector/views/inspector.html'
                        }
                    }
                })
            ;
        }]
    );

})(); 