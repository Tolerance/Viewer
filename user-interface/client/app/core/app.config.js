(function() {
    'use strict';

    angular.module('app.core')
        .config(['$mdThemingProvider', function($mdThemingProvider) {
            var cyanAlt = $mdThemingProvider.extendPalette('cyan', {
                'contrastLightColors': '500 600 700 800 900',
                'contrastStrongLightColors': '500 600 700 800 900'
            });
            var lightGreenAlt = $mdThemingProvider.extendPalette('light-green', {
                'contrastLightColors': '500 600 700 800 900',
                'contrastStrongLightColors': '500 600 700 800 900'
            });

            $mdThemingProvider
                .definePalette('cyanAlt', cyanAlt)
                .definePalette('lightGreenAlt', lightGreenAlt);


            $mdThemingProvider.theme('default')
                .primaryPalette('teal', {
                    'default': '500'
                })
                .accentPalette('cyanAlt', {
                    'default': '500'
                })
                .warnPalette('red', {
                    'default': '500'
                })
                .backgroundPalette('grey');
        }])
        .factory('appConfig', function() {
            return {
                color: {
                    primary:    '#009688',
                    success:    '#8BC34A',
                    info:       '#00BCD4',
                    infoAlt:    '#7E57C2',
                    warning:    '#FFCA28',
                    danger:     '#F44336',
                    text:       '#3D4051',
                    gray:       '#EDF0F1'
                }
            };
        })

})();