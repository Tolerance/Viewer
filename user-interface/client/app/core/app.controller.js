(function () {
    'use strict';

    angular.module('app')
    .controller('AppCtrl', [ '$scope', '$rootScope', '$state', '$document', AppCtrl]) // overall control
    
    function AppCtrl($scope, $rootScope, $state, $document) {
        $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
            $document.scrollTo(0, 0);
        });

        $scope.myDatetimeRange = {
            date: {
                from: new Date(),
                to: new Date(),
                max: new Date()
            },
            time: {
                from: 480, // default start time (in minutes)
                to: 1020, // default end time (in minutes)
                step: 15, // step width
                minRange: 15, // min range
                hours24: false // true = 00:00:00 | false = 00:00 am/pm
            }
        };

        $scope.myDatetimeLabels = {
            date: {
                from: 'Start date',
                to: 'End date'
            }
        };
    }

})(); 