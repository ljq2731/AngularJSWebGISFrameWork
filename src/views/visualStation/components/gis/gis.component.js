(function (angular) {

    'use strict';

    /**
     * @ngInject
     */
    function GisController($scope) {
        var self = this;
        self.$onInit = $onInit;

        var map = null;
        var interactionSelected = null;
        var selectedStyleMap = {};
        var layerSelected = [];

        function $onInit() {
            //
            createMap();
            //
            registerMapInterface();
            //
            registerMapInteractionSelected();
            //
            addPolygonFeatureLayer();
            //
            //var featureLayer = addPointFeatureLayer('featureLayer');
            //
        }

        function createMap() {
            map = new ol.Map({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                target: 'map',
                view: new ol.View({
                    center: [0, 0],
                    zoom: 3
                })
            });
        }

        function getLayer(layerName) {
            var layers = map.getLayers().getArray();
            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i];
                if (layer.get('name') === layerName) {
                    return layer;
                }
            }
            return null;
        }

        function locationPointFeature(layerName, featureId) {
            var featureLayer = getLayer(layerName);
            var feature = featureLayer.getSource().getFeatureById(featureId);
            var point = feature.getGeometry();
            var center = point.getCoordinates();
            var view = map.getView();
            view.setCenter(center);
            //
            // feature
            // interactionSelected.setProperties({
            //     filter: filterCallback
            // });
            interactionSelected.getFeatures().clear();
            interactionSelected.getFeatures().push(feature);
        }

        function filterCallback(feature, layer) {
            return (feature.getId() == ('id-featureLayer-' + 1) && layer.get('name') == 'featureLayer')
        }

        function registerMapInterface() {
            $scope.$on('gis-updateMap', updateMap);
            $scope.$on('gis-addFeatureLayer', addFeatureLayer);
            $scope.$on('gis-locationFeature', locationFeature)
        }
        //
        function updateMap(event, data) {
            //
            console.log(map.getSize());
            console.log("gis-updateSize");
            map.updateSize();
            map.getView().calculateExtent();
            console.log(map.getSize());
            //map.setSize([1890, 900]);
            //var map = angular.element('#map');
            // var mapDom = map.getViewport();
            // var rect = mapDom.getBoundingClientRect();
            // console.log(mapDom.clientWidth);
            //map.setSize([mapDom.clientWidth, mapDom.clientHeight]);
            //  map.setSize([rect.width, rect.height]);

        }
        //
        function addFeatureLayer(event, data) {
            console.log("gis-addFeatureLayer");
            addPointFeatureLayer('featureLayer');
            //event.stopPropagation();
        }
        //
        function locationFeature(event, data) {
            console.log("gis-locationFeature");
            var featureId = 'id-featureLayer-' + 1;
            locationPointFeature('featureLayer', featureId);
            //event.stopPropagation();
        }
        //
        function registerMapInteractionSelected() {
            interactionSelected = new ol.interaction.Select({
                layers: layerSelected,
                style: getSelectedStyle
                // filter: filterCallback
            });
            interactionSelected.on('select', featureSelectedEventHandle);
            map.addInteraction(interactionSelected);
        }

        function featureSelectedEventHandle(e) {
            // console.log(e);
            // console.log(e.target.getFeatures());
            // console.log(e.selected);
            // console.log(e.deselected);
            if (e.selected.length > 0) {
                var feature = e.selected[0];
                var layerName = feature.get('layer');
                console.log('feature-selected-' + layerName);
                var data = {
                    layer: layerName,
                    features: e.selected
                };
                $scope.$emit('feature-selected-' + layerName, data);
            }
        }

        function getSelectedStyle(feature, resolution) {
            return selectedStyleMap[feature.get('layer')];
        }

        function registerFeatureLayerCanSelected(featureLayer) {
            layerSelected.push(featureLayer);
        }

        function addPolygonFeatureLayer() {
            var featureLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    url: '../data/geojson/countries.geojson',
                    format: new ol.format.GeoJSON()
                })
            });
            console.log("add vector polygon!");
            map.addLayer(featureLayer);
            return featureLayer;
        }

        function addPointFeatureLayer(layerName) {
            var count = 10;
            var features = new Array(count);
            var e = 4500000;
            for (var i = 0; i < count; ++i) {
                var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
                var feature = new ol.Feature(new ol.geom.Point(coordinates));
                var id = 'id' + '-' + layerName + '-' + (i + 1)
                feature.set('layer', layerName);
                feature.setId(id);
                features[i] = feature;
            }
            var source = new ol.source.Vector({
                features: features
            });
            var featureLayer = new ol.layer.Vector({
                source: source,
                style: function (feature) {
                    //
                    var iconStyle = new ol.style.Style({
                        image: new ol.style.Icon(({
                            imgSize: [20, 20],
                            offset: [5, 5],
                            src: 'http://openlayers.org/assets/theme/img/logo70.png'
                        }))
                    });
                    return iconStyle;
                }
            });
            featureLayer.set('name', layerName);
            //
            map.addLayer(featureLayer);
            //
            var styleSelected = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 10,
                    stroke: new ol.style.Stroke({
                        color: '#fff'
                    }),
                    fill: new ol.style.Fill({
                        color: '#3399CC'
                    })
                }),
                text: new ol.style.Text({
                    text: '123',
                    fill: new ol.style.Fill({
                        color: '#fff'
                    })
                })
            });
            selectedStyleMap[layerName] = styleSelected;
            //
            registerFeatureLayerCanSelected(featureLayer);
            return featureLayer;
        }
    }

    var gis = {
        bindings: {},
        controller: GisController,
        templateUrl: 'views/visualStation/components/gis/gis.html'
    };

    angular.module('common.gis').component('gis', gis, []);

})(angular);