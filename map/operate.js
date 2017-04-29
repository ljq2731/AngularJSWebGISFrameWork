var openStreetMapOffset = getOpenStreetMapLayer();
var layers = [openStreetMap, googleMap, vectorLayer]; 
//  baidu_layer  googleMap  osmLayer openStreetMap   vectorLayer 

//
var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326'
});
//
var map = new ol.Map({
    layers: layers,
    target: 'map',
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
        })
    }).extend([mousePositionControl]),
    overlays: [overlay],
    view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.fromLonLat([108.9471367, 34.2644691], 'EPSG:3857'),
        zoom: 14
    })
});
//


map.on('singleclick', function (evt) {
    var coordinate = evt.coordinate;
    //var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
    //content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
    var stringifyCoordinateFunction = ol.coordinate.createStringXY(7);
    var coordinateWGS3857 = stringifyCoordinateFunction(coordinate);
    var coordinateWGS4326 = stringifyCoordinateFunction(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
    document.getElementById('popup-content').innerHTML = 'WGS3857: ' + coordinateWGS3857 + '</br>WGS4326: ' + coordinateWGS4326;
    overlay.setPosition(coordinate);
});

//34.2644691,108.9471367,21
var container = document.getElementById('popup');

//
document.getElementById('popup-closer').onclick = function () {
    overlay.setPosition(undefined);
    document.getElementById('popup-closer').blur();
    return false;
};

document.getElementById('toggle-layer').onclick = function () {
    var layer = map.getLayers().item(0);
    layer.setVisible(!layer.getVisible());
    //
    layer = map.getLayers().item(1);
    layer.setVisible(!layer.getVisible());
};
//	
document.getElementById('zoom-out').onclick = function () {
    var view = map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom - 1);
};

document.getElementById('zoom-in').onclick = function () {
    var view = map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom + 1);
};