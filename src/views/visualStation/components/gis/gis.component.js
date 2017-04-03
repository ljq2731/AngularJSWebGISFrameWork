(function (angular) {

    'use strict';

    /**
     * @ngInject
     */
    function GisController($scope, GisService) {
        var self = this;
        self.$onInit = $onInit;

        var map = null;
        var interactionSelected = null;
        var selectedStyleMap = {};
        var layerSelected = [];

        function $onInit() {
            //
            map = GisService.createMap();            
            //
            interactionSelected = GisService.registerMapInteractionSelected(map, featureSelectedEventHandle, selectedStyleMap, layerSelected);
            //
            GisService.addPolygonFeatureLayer(map, 'featureLayerPolygon', selectedStyleMap, layerSelected);
            //
            registerMapInterface();
        }

        function filterCallback(feature, layer) {
            return (feature.getId() == ('id-featureLayer-' + 1) && layer.get('name') == 'featureLayer')
        }

        function registerMapInterface() {
            $scope.$on('gis-updateMap', updateMapEventHandle);
            $scope.$on('gis-addFeatureLayer', addFeatureLayerEventHandle);
            $scope.$on('gis-locationFeature', locationFeatureEventHandle)
        }
        //
        function updateMapEventHandle(event, data) {
            console.log("gis-updateSize");
            map.updateSize();
        }
        //
        function addFeatureLayerEventHandle(event, data) {
            console.log("gis-addFeatureLayer");
            var layerName = 'featureLayer';
            GisService.addPointFeatureLayer(map, layerName, selectedStyleMap, layerSelected);
            //event.stopPropagation();
        }
        //
        function locationFeatureEventHandle(event, data) {
            console.log("gis-locationFeature");
            var featureId = 'id-featureLayer-' + 1;
            var layerName = 'featureLayer';
            GisService.locationPointFeature(map, layerName, featureId, interactionSelected);
            //event.stopPropagation();
        }
        //
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
    }

    var gis = {
        bindings: {},
        controller: GisController,
        templateUrl: 'views/visualStation/components/gis/gis.html'
    };

    angular.module('common.gis').component('gis', gis, []);

})(angular);