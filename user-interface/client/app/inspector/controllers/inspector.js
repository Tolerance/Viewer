angular.module('app.inspector')
    .controller('InspectorController', function($scope, $rootScope, $timeout) {
        $scope.display = {
            missingIdentifier: true,
            graph: true,
            table: true
        };

        $scope.toggle = function(identifier) {
            $scope.display[identifier] = !$scope.display[identifier];
        };

        $scope.inspect = function(query) {
            $scope.display.missingIdentifier = false;
            $scope.display.loading = true;
            $scope.display.inspector = false;

            $timeout(function() {
                $scope.display.loading = false;
                $scope.display.inspector = true;
            }, 1000);
        };

        $scope.$on("angular-resizable.resizeEnd", function (event, args) {
            $rootScope.$broadcast('inspectorResized');
        });
    });
