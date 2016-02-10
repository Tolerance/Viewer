(function () {
    'use strict';

    angular.module('app').controller('DashboardCtrl', ['$scope', 'appConfig', function($scope, appConfig) {
        $scope.smline1 = {};
        $scope.smline2 = {};
        $scope.smline1.options = {
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: appConfig.color.gray
                    }
                }
            },
            grid: {
                x: 1,
                y: 1,
                x2: 1,
                y2: 1,
                borderWidth: 0
            },
            xAxis : [
                {
                    type : 'category',
                    show: false,
                    boundaryGap : false,
                    data : [1,2,3,4,5,6,7]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show: false,
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            series : [
                {
                    name:'*',
                    type:'line',
                    symbol: 'none',
                    data:[11, 11, 15, 13, 12, 13, 10],
                    itemStyle: {
                        normal: {
                            color: appConfig.color.info
                        }
                    }
                }
            ]
        };
        $scope.smline2.options = {
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: appConfig.color.gray
                    }
                }
            },
            grid: {
                x: 1,
                y: 1,
                x2: 1,
                y2: 1,
                borderWidth: 0
            },
            xAxis : [
                {
                    type : 'category',
                    show: false,
                    boundaryGap : false,
                    data : [1,2,3,4,5,6,7]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show: false,
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            series : [
                {
                    name:'*',
                    type:'line',
                    symbol: 'none',
                    data:[11, 12, 8, 10, 15, 12, 10],
                    itemStyle: {
                        normal: {
                            color: appConfig.color.warning
                        }
                    }
                }
            ]
        };
    }]);


})(); 
