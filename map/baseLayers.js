  //  http://mt0.google.cn/vt/pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i128!2m2!1e0!3i333048300!3m7!2szh-CN!3scn!5e1105!12m1!1e47!12m1!1e3!4e0
  var googleMap = new ol.layer.Tile({
      source: new ol.source.XYZ({
          //url: 'http://mt0.google.cn/vt/pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m2!1e0!3i333048300!3m7!2szh-CN!3scn!5e1105!12m1!1e47!12m1!1e3!4e0',
          url: 'http://mt{0-3}.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i376063156!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0',
          //url: 'http://t1.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}',
          crossOrigin: '*',
          projection: 'EPSG:3857',
          attributions: ''
      }),
      visible: false
  });
  var openStreetMap = new ol.layer.Tile({
      source: new ol.source.XYZ({
          //url: 'http://mt0.google.cn/vt/pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m2!1e0!3i333048300!3m7!2szh-CN!3scn!5e1105!12m1!1e47!12m1!1e3!4e0',
          url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          crossOrigin: '*',
          projection: 'EPSG:3857',
          attributions: ''
      }),
      visible: true
  });
  var osmLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
  });
  var overlay = new ol.Overlay( /** @type {olx.OverlayOptions} */ ({
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
          duration: 250
      }
  }));



  var styleFunction = function (feature) {
      var circleStyle = new ol.style.Circle({
          radius: 5,
          fill: null,
          stroke: new ol.style.Stroke({
              color: 'red',
              width: 1
          })
      });
      var imageStyle = new ol.style.Icon(({
          imgSize: [25, 41],
          anchor:[0.5, 1],
          src: 'marker.png'
      }));
      var styles = {
          'Point': new ol.style.Style({
              image: imageStyle
          }),
          'LineString': new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: 'green',
                  width: 1
              })
          }),
          'MultiLineString': new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: 'green',
                  width: 1
              })
          }),
          'MultiPoint': new ol.style.Style({
              image: circleStyle
          }),
          'MultiPolygon': new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: 'yellow',
                  width: 1
              }),
              fill: new ol.style.Fill({
                  color: 'rgba(255, 255, 0, 0.1)'
              })
          }),
          'Polygon': new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: 'blue',
                  lineDash: [4],
                  width: 3
              }),
              fill: new ol.style.Fill({
                  color: 'rgba(0, 0, 255, 0.1)'
              })
          }),
          'GeometryCollection': new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: 'magenta',
                  width: 2
              }),
              fill: new ol.style.Fill({
                  color: 'magenta'
              }),
              image: new ol.style.Circle({
                  radius: 10,
                  fill: null,
                  stroke: new ol.style.Stroke({
                      color: 'magenta'
                  })
              })
          }),
          'Circle': new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: 'red',
                  width: 2
              }),
              fill: new ol.style.Fill({
                  color: 'rgba(255,0,0,0.2)'
              })
          })
      };
      return styles[feature.getGeometry().getType()];
  };

  var vectorSource = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
  });

  //vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));

  var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: styleFunction
  });

  var coordinates = [
      [108.9233922, 34.2507729],
      [108.9724938, 34.2510637],
      [108.9724176, 34.2773390],
      [108.9222423, 34.2765158]
  ];
  for (var i = 0; i < coordinates.length; i++) {
      var coordinateXY = ol.proj.fromLonLat(coordinates[i], 'EPSG:3857');
      var feature = new ol.Feature({
          geometry: new ol.geom.Point(coordinateXY)
      });
      vectorSource.addFeature(feature);
  }