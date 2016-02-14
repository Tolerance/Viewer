'use strict';

angular.module('app.inspector')
    .service('Inspector', function($http, $q, API_ROOT) {
        var decoratesInspection = function(inspection) {
            inspection.getProfile = function(identifier) {
                for (var i = 0; i < inspection.profiles.length; i++) {
                    var profile = inspection.profiles[i];

                    if (profile.identifier == identifier) {
                        return profile;
                    }
                }

                return null;
            };

            return inspection;
        };

        this.inspect = function(query) {
            return $http.get(API_ROOT+'/inspection', {
                params: query
            }).then(function(httpResponse) {
                var inspection = httpResponse.data;

                if (!inspection.profiles || inspection.profiles.length < 1) {
                    return $q.reject({
                        message: 'No profile found'
                    });
                }

                return decoratesInspection(inspection);
            }, function(error) {
                return $q.reject({
                    message: error.data && error.data.error ? error.data.error.message : 'Unknown error ('+error.status+')'
                });
            });
        };
    });
