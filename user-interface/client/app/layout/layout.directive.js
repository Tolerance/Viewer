(function () {
    'use strict';

    angular.module('app.layout')
        .directive('uiPreloader', ['$rootScope', function($rootScope) {
            return {
                restrict: 'A',
                template:'<span class="bar"></span>',
                link: function(scope, el, attrs) {
                    el.addClass('preloaderbar hide');
                    scope.$on('$stateChangeStart', function(event) {
                        el.removeClass('hide').addClass('active');
                    });
                    scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
                        event.targetScope.$watch('$viewContentLoaded', function(){
                            el.addClass('hide').removeClass('active');
                        })
                    });

                    scope.$on('preloader:active', function(event) {
                        el.removeClass('hide').addClass('active');
                    });
                    scope.$on('preloader:hide', function(event) {
                        el.addClass('hide').removeClass('active');
                    });
                }
            };
        }])
        .directive('uiNotCloseOnClick', function() {
            return {
                restrict: 'A',
                compile: function(ele, attrs) {
                    return ele.on('click', function(event) {
                        event.stopPropagation();
                    });
                }
            };
        })
        .config(function($provide) {
            $provide.decorator('rgRangePickerDirective', function($delegate) {
                var directive = $delegate[0];

                directive.template = function() {
                    return '<div class="rg-range-picker" ng-class="{\'rg-range-picker-vertical\':vertical}">' +
                            '<div class="rg-range-picker-box well" ng-class="{ \'only-calendars\': !data.hasTimeSliders, \'only-slider\': !data.hasDatePickers }">' +
                                '<div class="rg-range-picker-calendars" ng-show="data.hasDatePickers">' +
                                    '<div class="rg-range-picker-calendar-box">' +
                                        '<h5 class="rg-range-picker-calendar-label" ng-bind-template="{{datepickerTitles.from}}"></h5>' +
                                        '<uib-datepicker ng-model="data.date.from" max-date="data.date.to" min-date="data.date.min" show-weeks="false" class="clean-calendar"></uib-datepicker>' +
                                    '</div>' +
                                    '<div class="rg-range-picker-calendar-box right">' +
                                        '<h5 class="rg-range-picker-calendar-label" ng-bind-template="{{datepickerTitles.to}}"></h5>' +
                                        '<uib-datepicker ng-model="data.date.to" min-date="data.date.from" max-date="data.date.max" show-weeks="false" class="clean-calendar"></uib-datepicker>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="rg-range-picker-slider" id="rgRangePickerSliderContainer" ng-show="data.hasTimeSliders">' +
                                    '<div class="rg-range-picker-slider-labels">' +
                                        '<div class="row">' +
                                            '<div class="rg-range-picker-divider xs-hidden"><span class="label">to</span></div>' +
                                            '<div class="col-xs-6 text-center"><span class="label label-range-picker">{{data.time.from | rgTime:data.time.hours24}}</span></div>' +
                                            '<div class="col-xs-6 text-center"><span class="label label-range-picker">{{data.time.to | rgTime:data.time.hours24}}</span></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                };
                return $delegate;
            });
        });

})(); 

