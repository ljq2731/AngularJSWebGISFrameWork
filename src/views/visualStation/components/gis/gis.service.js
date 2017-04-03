  (function (angular) {

      'use strict';

      /**
       * @ngInject
       */
      function GisService() {
          var self = this;
          var thisIsPrivate = "Private";
          var mapCenter = [108.9472, 34.2645];
          self.createBaseLayer = createBaseLayer;
          self.createMap = createMap;
          self.getLayer = getLayer;
          self.locationPointFeature = locationPointFeature;
          self.addPolygonFeatureLayer = addPolygonFeatureLayer;
          self.addPointFeatureLayer = addPointFeatureLayer;
          self.registerMapInteractionSelected = registerMapInteractionSelected;

          function createBaseLayer() {
              var baseLayers = [
                  new ol.layer.Tile({
                      source: new ol.source.XYZ({
                          //url: 'http://mt0.google.cn/vt/pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m2!1e0!3i333048300!3m7!2szh-CN!3scn!5e1105!12m1!1e47!12m1!1e3!4e0',
                          url: 'http://mt{0-3}.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i376063156!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0',
                          crossOrigin: '*',
                          attributions: ''
                      })
                  })
              ];
              return baseLayers;
          }

          function createControl() {
              var controls = [];
              var mousePositionControl = new ol.control.MousePosition({
                  coordinateFormat: ol.coordinate.createStringXY(4),
                  projection: 'EPSG:4326'
              });
              controls.push(mousePositionControl);
              return controls;
          }

          function createMap() {
              var map = new ol.Map({
                  layers: createBaseLayer(),
                  target: 'map',
                  view: new ol.View({
                      center: ol.proj.fromLonLat(mapCenter, 'EPSG:3857'), //[108, 33],
                      zoom: 14
                  }),
                  controls: ol.control.defaults({
                      attributionOptions: ({
                          collapsible: true
                      })
                  }).extend(createControl())
              });
              return map;
          }
          //

          function getLayer(map, layerName) {
              var layers = map.getLayers().getArray();
              for (var i = 0; i < layers.length; i++) {
                  var layer = layers[i];
                  if (layer.get('name') === layerName) {
                      return layer;
                  }
              }
              return null;
          }

          //
          function locationPointFeature(map, layerName, featureId, interactionSelected) {
              var featureLayer = getLayer(map, layerName);
              var feature = featureLayer.getSource().getFeatureById(featureId);
              var point = feature.getGeometry();
              var center = point.getCoordinates();
              var view = map.getView();
              view.setCenter(center);
              //
              // interactionSelected.setProperties({
              //     filter: filterCallback
              // });
              interactionSelected.getFeatures().clear();
              interactionSelected.getFeatures().push(feature);
          }


          function addPolygonFeatureLayer(map, layerName, selectedStyleMap, layerSelected) {
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

          function addPointFeatureLayer(map, layerName, selectedStyleMap, layerSelected) {
              var count = 10;
              var features = new Array(count);
              var e = 4500;
              var centerXY = ol.proj.fromLonLat(mapCenter, 'EPSG:3857');
              for (var i = 0; i < count; ++i) {
                  var coordinates = [centerXY[0] + e * Math.random() - e / 2, centerXY[1] + e * Math.random() - e / 2];
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
              layerSelected.push(featureLayer);
              return featureLayer;
          }


          function registerMapInteractionSelected(map, featureSelectedEventHandle, selectedStyleMap, layerSelected) {
              var interactionSelected = new ol.interaction.Select({
                  layers: layerSelected,
                  style: function (feature, resolution) {
                      return getSelectedStyle(feature, resolution, selectedStyleMap);
                  }
                  // filter: filterCallback
              });
              interactionSelected.on('select', featureSelectedEventHandle);
              map.addInteraction(interactionSelected);
              return interactionSelected;
          }

          function getSelectedStyle(feature, resolution, selectedStyleMap) {
              var style = selectedStyleMap[feature.get('layer')];
              console.log(style);
              return style;
          }

      }

      angular.module('common.gis').service('GisService', GisService);

  })(angular);