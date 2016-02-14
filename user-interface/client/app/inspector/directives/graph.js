'use strict';

angular.module('app.inspector')
    .directive('graph', function($timeout, GraphBuilder) {
        return {
            restrict: 'E',
            scope: {
                inspection: '='
            },
            link: function(scope, element) {
                var graph = null;

                scope.$watch('inspection', function(inspection) {
                    console.log('Got inspection', inspection);
                    if (undefined === inspection) {
                        $(element).empty();
                    } else {
                        $timeout(function() {
                            buildGraph(inspection);
                        }, 100);
                    }
                });

                function buildGraph(inspection) {
                    var elements = GraphBuilder.fromInspection(inspection);

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

                        elements: elements,

                        layout: {
                            name: 'circle',
                            padding: 10
                        },

                        ready: function () {
                            this.resize();

                            graph = this;
                        }
                    });
                }

                scope.$on('inspectorResized', function() {
                    if (graph) {
                        graph.resize();
                    }
                });
            }
        };
    })
    .service('GraphBuilder', function() {
        var GraphObject = function(attributes) {
            this.getIdentifier = function() {
                return attributes.id;
            };

            this.toArray = function() {
                return attributes;
            };
        };

        GraphObject.fromPeer = function(attributes) {
            attributes.id = attributes.name = attributes.service;
            attributes.faveColor = attributes.virtual ? '#00BCD4' : '#8BC34A';

            return new this(attributes);
        };

        var GraphObjectCollection = function() {
            var objects = [];

            this.add = function(object) {
                objects.push(object);
            };

            this.addIfNotExists = function(object) {
                if (!this.exists(object)) {
                    this.add(object);
                }
            };

            this.exists = function(object) {
                for (var i = 0; i < objects.length; i++) {
                    if (objects[i].getIdentifier() == object.getIdentifier()) {
                        return true;
                    }
                }

                return false;
            };

            this.toDataArray = function() {
                return objects.map(function(object) {
                    return {data: object.toArray()};
                });
            };
        };

        this.fromInspection = function(inspection) {
            var nodes = new GraphObjectCollection(),
                edges = new GraphObjectCollection();

            for (var i = 0; i < inspection.profiles.length; i++) {
                var profile = inspection.profiles[i],
                    sender = GraphObject.fromPeer(profile.sender),
                    recipient = GraphObject.fromPeer(profile.recipient);

                nodes.addIfNotExists(sender);
                nodes.addIfNotExists(recipient);
                edges.add(new GraphObject({
                    id: profile.identifier,
                    source: sender.getIdentifier(),
                    target: recipient.getIdentifier(),
                    weight: 50
                }));
            }

            return {
                nodes: nodes.toDataArray(),
                edges: edges.toDataArray()
            };
        };
    });

