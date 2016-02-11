'use strict';

angular.module('app.inspector')
    .directive('graph', function() {
        return {
            restrict: 'E',
            link: function(scope, element) {
                function buildGraph() {
                    $(element).cytoscape({
                        style: cytoscape.stylesheet()
                            .selector('node')
                            .css({
                                'width': 'label',
                                'height': '50px',
                                'shape': 'rectangle',
                                'content': 'data(name)',
                                'text-valign': 'center',
                                'text-outline-color': 'data(faveColor)',
                                'text-outline-width': 2,
                                'background-color': 'data(faveColor)',
                                'text-wrap': 'wrap',
                                'padding-left': 10,
                                'padding-right': 10
                            })
                            .selector('edge')
                            .css({
                                'width': 'mapData(weight, 0, 100, 1, 10)',
                                'target-arrow-shape': 'triangle',
                                'opacity': 0.5,
                                'label': 'data(label)'
                            })
                            .selector('node:selected')
                            .css({
                                'background-color': 'black',
                                'color': 'white',
                                'line-color': 'black',
                                'target-arrow-color': 'black',
                                'source-arrow-color': 'black',
                                'text-outline-width': 0,
                                'opacity': 1
                            })
                            .selector('edge:selected')
                            .css({
                                'line-color': 'blue'
                            })
                            .selector('.faded')
                            .css({
                                'opacity': 0.25,
                                'text-opacity': 0
                            }),

                        elements: {
                            nodes: [
                                {data: {id: 'Unknown', name: 'Unknown', faveColor: '#86B342'}},
                                {data: {id: 'SymfonyExample', name: 'SymfonyExample', faveColor: '#86B342'}},
                                {data: {id: 'github.com', name: 'github.com', faveColor: '#86B342'}}
                            ],

                            edges: [
                                {data: {id: 'ae', weight: 80, source: 'Unknown', target: 'SymfonyExample'}},
                                {data: {id: 'ab', weight: 20, source: 'SymfonyExample', target: 'github.com'}}
                            ]
                        },

                        layout: {
                            name: 'circle',
                            padding: 10
                        },

                        ready: function () {
                            var cy = this;
                            console.log('ready', cy);
                        }
                    });
                }

                scope.$on('inspectorResized', function() {
                    buildGraph();
                });
            }
        };
    });
