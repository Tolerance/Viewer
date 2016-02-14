angular.module('app.inspector')
    .controller('InspectorController', function($scope, $rootScope, $timeout, Inspector) {
        $scope.display = {
            message: 'Type a message identifier first.',
            graph: true,
            table: true
        };

        $scope.toggle = function(identifier) {
            $scope.display[identifier] = !$scope.display[identifier];
        };

        $scope.inspect = function(query) {
            $scope.display.message = false;
            $scope.display.loading = true;
            $scope.display.inspector = false;

            Inspector.inspect(query).then(function(inspection) {
                $scope.inspection = inspection;
                $scope.display.inspector = true;
            }, function(error) {
                $scope.display.message = error.message;
            })['finally'](function() {
                $scope.display.loading = false;
            });
        };

        $scope.$on("angular-resizable.resizeEnd", function (event, args) {
            $rootScope.$broadcast('inspectorResized');
        });
    });
