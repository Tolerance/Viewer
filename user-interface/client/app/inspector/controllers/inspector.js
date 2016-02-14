angular.module('app.inspector')
    .controller('InspectorController', function($scope, $rootScope, $timeout, $state, $q, Inspector) {
        var inspectionPromise = null;

        $scope.display = {
            message: 'Type a message identifier first.',
            graph: true,
            table: true
        };

        $scope.toggle = function(identifier) {
            $scope.display[identifier] = !$scope.display[identifier];
        };

        $scope.inspect = function(query) {
            $state.go('.', query);
        };

        $scope.openProfileDetails = function(profileIdentifier) {
            $state.params.profile = profileIdentifier;

            $state.go('.', $state.params);
        };

        $scope.closeProfileDetails = function() {
            $state.params.profile = null;

            $state.go('.', $state.params);
        };

        var refreshScope = function() {
            if (!$scope.inspection) {
                inspect($state.params);
            }

            if ($state.params.profile) {
                inspectionPromise.then(function () {
                    $scope.profile = $scope.inspection.getProfile($state.params.profile);
                });
            } else {
                $scope.profile = null;
            }
        };

        var inspect = function(query) {
            $scope.display.message = false;
            $scope.display.loading = true;
            $scope.display.inspector = false;

            inspectionPromise = Inspector.inspect(query).then(function(inspection) {
                $scope.inspection = inspection;
                $scope.display.inspector = true;
            }, function(error) {
                $scope.display.message = error.message;

                return $q.reject(error);
            })['finally'](function() {
                $scope.display.loading = false;
            });
        };

        $scope.$on("angular-resizable.resizeEnd", function (event, args) {
            $rootScope.$broadcast('inspectorResized');
        });

        $scope.$on('$locationChangeSuccess', refreshScope);
        refreshScope();
    });
