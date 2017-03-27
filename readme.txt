0.
visualcppbuildtools_full.exe
npm config set msvs_version 2015 -g

python2.7.exe
npm config set python C:/Python27/ArcGIS10.2

1.
nmp init

2.
bower init

3.
bower install leaflet#0.7.7 --save

bower install PruneCluster --save

#----------------------------------------
bower install angular --save

bower install angular-route --save

bower install angular-resource --save

bower install angular-sanitize --save 

bower install angular-cookies --save

bower install angular-motion --save

bower install angular-animate --save

bower install angular-ui-event --save

bower install angular-ui-grid --save

bower install angular-ui-mask --save

bower install angular-block-ui --save

bower install angular-ui-validate --save

bower install angular-ui-layout --save

bower install angular-ui-indeterminate --save

bower install angular-select --save

bower install angular-ui-slider --save

bower install angular-ui-scroll --save

bower install angular-ui-scrollpoint --save

bower insstall angular-ui-router --save

bower install ui-router-extras --save

bower install ui-router-extras-statevis --save

bower install angular-sanitize --save 

bower install angular-bootstrap --save

bower install angular-leaflet-directive --save

bower install angular-simple-logger --save

bower install angularAMD --save

bower install requirejs --save

bower install requirejs-plugins --save

bower install oclazyload --save

bower install d3 --save

bower install lodash --save

bower install lodash --save

bower install require-css --save

#--------------------------------------------
bower install jquery --save

bower install bootstrap --save

bower install Font-Awesome --save

bower install ionicons --save


4.
//https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules
//https://www.npmjs.com/package/node-gyp
npm install node-gyp --save-dev





npm install --save-dev gulp
npm install --save-dev gulp-connect
npm install --save-dev gulp-webserver
npm install --save-dev gulp-if
npm install --save-dev gulp-useref
npm install --save-dev gulp-concat
npm install --save-dev gulp-rename
npm install --save-dev gulp-clean
npm install --save-dev gulp-sourcemaps
npm install --save-dev browser-sync
npm install --save-dev connect-history-api-fallback

npm install --save-dev stream-series

//JS
npm install --save-dev gulp-eslint
npm uninstall --save-dev eslint-stylish
npm install --save-dev gulp-uglify

//CSS
npm install --save-dev gulp-stylus
npm install --save-dev nib
npm install --save-dev gulp-minify-css
npm install --save-dev gulp-uncss

//HTML
npm install --save-dev wiredep
npm install --save-dev gulp-inject
npm install --save-dev main-bower-files

npm install -g cnpm --registry=https://registry.npm.taobao.org

cnpm install --save-dev phantomjs

//Test
npm install --save-dev karma
npm install --save-dev gulp-karma
npm install --save-dev jasmine
npm install --save-dev karma-jasmine
npm install --save-dev karma-junit-reporter
npm install --save-dev karma-coverage
npm install --save-dev requirejs
npm install --save-dev karma-requirejs
npm install --save-dev karma-phantomjs-launcher
npm install --save-dev karma-chrome-launcher
npm install --save-dev karma-firefox-launcher
npm install --save-dev karma-script-launcher
npm install --save-dev gulp-protractor
npm install --save-dev protractor
webdriver-manager update

#
npm install --save-dev gulp-angular-filesort
npm install --save-dev gulp-angular-templatecache


5.
1)ui-leaflet.js
imageOverlay: {
    mustHaveUrl: true,
    mustHaveBounds : true,
    createLayer: function(params) {
        return L.imageOverlay(params.url, params.bounds, params.options);
    }
},
soGouTiles: {
    createLayer: function(params) {
        return L.tileLayer.soGouMap(params.options);
    }
},


karma start ./conf/karma.conf.js
	
set CHROME_BIN="D:\GreenSoftware\Chrome55\chrome.exe"