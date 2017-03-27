(function (angular) {

  'use strict';
  angular.module('app').config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug: true,
      event: true,
      modules: [{
        name: 'baseInfo',
        serie: true,
        files: ['views/baseInfo/baseInfo.module.js', 'views/baseInfo/baseInfo.service.js', 'views/baseInfo/baseInfo.component.js']
      }, {
        name: 'baseInfoItem',
        serie: true,
        files: ['views/baseInfo/components/baseInfoItem/baseInfoItem.module.js', 'views/baseInfo/components/baseInfoItem/baseInfoItem.component.js']
      }, {
        name: 'monitor',
        serie: true,
        files: ['views/monitor/monitor.module.js', 'views/monitor/monitor.service.js', 'views/monitor/monitor.controller.js']
      }, {
        name: 'visualStation',
        serie: true,
        cache: 'false',
        files: ['views/visualStation/visualStation.module.js', 'views/visualStation/visualStation.service.js', 'views/visualStation/visualStation.component.js', 'views/visualStation/visualStation.css']
      }, {
        name: 'gis',
        serie: true,
        cache: 'false',
        //rerun: true,
        //reconfig: true,
        files: ['views/visualStation/components/gis/gis.module.js', 'views/visualStation/components/gis/gis.service.js', 'views/visualStation/components/gis/gis.component.js', 'views/visualStation/components/gis/gis.css']
      }, {
        name: 'openlayers',
        serie: true,
        //rerun: true,
        //reconfig: true,
        files: ['lib/openlayers/dist/ol.js']
      }]
    });
  }]);

})(angular);