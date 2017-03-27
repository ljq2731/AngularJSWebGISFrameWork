(function (angular) {

  'use strict';

  angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$futureStateProvider', function ($stateProvider, $urlRouterProvider, $futureStateProvider) {
    //
    var lazyDeferred;

    $urlRouterProvider.otherwise('/monitor');

    $stateProvider
      .state('monitor', {
        url: '/monitor',
        templateUrl: 'views/monitor/monitor.html',
        controller: 'MonitorController',
        resolve: {
          load: function ($templateCache, $ocLazyLoad, $q) {
            var deferred = $q.defer();
            $ocLazyLoad.load('monitor').then(function (name) {
              deferred.resolve();
            }, function () {
              deferred.reject();
            });
            return deferred.promise;
            /*
            $ocLazyLoad.load({
              serie: true,
              files: ['views/monitor/monitor.controller.js']
            }).then(function (name) {
              deferred.resolve();
            }, function () {
              deferred.reject();
            });
            return deferred.promise;
            */
          }
        }
      })
      .state('baseInfo', {
        url: '/baseInfo',
        template: '<base-info></base-info>',
        resolve: {
          load: function ($templateCache, $ocLazyLoad, $q) {
            var deferred = $q.defer();
            $ocLazyLoad.load('baseInfo').then(function (name) {
              deferred.resolve();
            }, function () {
              deferred.reject();
            });
            return deferred.promise;
            /*
            $ocLazyLoad.load({
              serie: true,
              files: ['views/baseInfo/baseInfo.component.js']
            }).then(function (name) {
              deferred.resolve();
            }, function () {
              deferred.reject();
            });
            return deferred.promise;
            */
          }
        }
      })
      .state('visualStation', {
        url: '/visualStation',
        cache: 'false',
        template: '<visual-station></visual-station>',
        resolve: {
          load: function ($templateCache, $ocLazyLoad, $q) {
            var deferred = $q.defer();
            $ocLazyLoad.load('visualStation').then(function (name) {
              deferred.resolve();
            }, function () {
              deferred.reject();
            });
            return deferred.promise;
          }
        }
      });
    //$locationProvider.html5Mode(true);
  }]);

})(angular);