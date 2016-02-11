angular.module('app.layout')
    .controller('HeaderController', function($scope, $rootScope) {
        var timeToSeconds = function(dateTime) {
            return dateTime.getHours() * 60 + dateTime.getSeconds();
        };

        var secondsToDateTime = function(origin, seconds) {
            var originHours = Math.ceil(seconds / 60),
                originSeconds = seconds % 60;

            origin.setHours(originHours);
            origin.setSeconds(originSeconds);

            return origin;
        };

        $scope.dateTime = {
            from: new Date(),
            to: new Date()
        };

        $scope.dateTime.from.setHours($scope.dateTime.from.getHours() - 1);

        $scope.pickedDatetimeRange = {
            date: {
                from: $scope.dateTime.from,
                to: $scope.dateTime.to,
                max: new Date()
            },
            time: {
                from: timeToSeconds($scope.dateTime.from),
                to: timeToSeconds($scope.dateTime.to),
                step: 15,
                minRange: 15,
                hours24: false
            }
        };

        $scope.changeDateTime = function() {
            $scope.dateTime = {
                from: secondsToDateTime($scope.pickedDatetimeRange.date.from, $scope.pickedDatetimeRange.time.from),
                to: secondsToDateTime($scope.pickedDatetimeRange.date.to, $scope.pickedDatetimeRange.time.to)
            };

            $rootScope.$broadcast('dateChanged', $scope.dateTime);
        };

        $rootScope.$broadcast('dateChanged', $scope.dateTime);
    });
