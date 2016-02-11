angular.module('app.inspector')
    .controller('InspectorController', function($scope, $rootScope) {
        $scope.display = {
            missingIdentifier: true,
            graph: true,
            table: true,
        };

        $scope.toggle = function(identifier) {
            $scope.display[identifier] = !$scope.display[identifier];
        };

        $scope.inspect = function(query) {
            $scope.display.missingIdentifier = false;
            $scope.display.inspector = true;
        };

        $scope.$on("angular-resizable.resizeEnd", function (event, args) {
            $rootScope.$broadcast('inspectorResized');
        });
    });
