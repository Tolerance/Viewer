'use strict';

angular.module('app.inspector')
    .service('Inspector', function($http, $q) {
        this.inspect = function(query) {
            return $http.get('http://viewer_api.docker/app_dev.php/inspection', {
                params: query
            }).then(function(httpResponse) {
                var data = httpResponse.data;

                if (!data.profiles || data.profiles.length < 1) {
                    return $q.reject({
                        message: 'No profile found'
                    });
                }

                return data;
            }, function(error) {
                return $q.reject({
                    message: error.data && error.data.error ? error.data.error.message : 'Unknown error ('+error.status+')'
                });
            });
        };
    });
