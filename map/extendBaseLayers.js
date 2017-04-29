/*var projection = ol.proj.get("EPSG:3857");
var resolutions = [];
for (var i = 0; i < 19; i++) {
    resolutions[i] = Math.pow(2, 18 - i);
}
var tilegrid = new ol.tilegrid.TileGrid({
    origin: [0, 0],
    resolutions: resolutions
});

var baidu_source = new ol.source.TileImage({
    projection: projection,
    tileGrid: tilegrid,
    tileUrlFunction: function (tileCoord, pixelRatio, proj) {
        if (!tileCoord) {
            return "";
        }
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = tileCoord[2];

        if (x < 0) {
            x = "M" + (-x);
        }
        if (y < 0) {
            y = "M" + (-y);
        }

        return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20151021&scaler=1&p=1";
    }
});

var baidu_layer = new ol.layer.Tile({
    source: baidu_source
});*/

function getOpenStreetMapLayer() {
    var projection = ol.proj.get("EPSG:3857");
    var domain = ['a', 'b', 'c'];
    var url = 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    /*var projectedExtent = [-20038350.342789244, -20037968.342789244,
        20038350.342789244, 20037968.342789244
    ];*/
    /*var projectedExtent = [ -19861978.14181085, -20037968.342789244,
         19993693.61991471, 20037968.342789244];*/
         var projectedExtent = [ -20214004.555103615, -20037968.342789244,
         20081564.183303617, 20037968.342789244];

    var maxResolution = ol.extent.getWidth(projectedExtent) / 256;

    var resolutions = [];
    for (var i = 0; i < 30; i++) {
        resolutions[i] = maxResolution / Math.pow(2, i);
    }
    var origin = ol.extent.getTopLeft(projectedExtent);
    //
    var tileGrid = new ol.tilegrid.TileGrid({
        origin: origin,
        extent: projectedExtent,
        resolutions: resolutions,
        tileSize: 256
    });

    var source = new ol.source.TileImage({
        projection: projection,
        tileGrid: tileGrid,
        tileUrlFunction: function (tileCoord, pixelRatio, proj) {
            if (!tileCoord) {
                return "";
            }
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var index = parseInt(Math.random() * 3, 10);
            var tileUrl = url;
            tileUrl = tileUrl.replace('{a-c}', domain[index])
                .replace('{x}', x)
                .replace('{y}', y)
                .replace('{z}', z);
            return tileUrl;
        }
    });

    var layer = new ol.layer.Tile({
        source: source
    });

    return layer;
}