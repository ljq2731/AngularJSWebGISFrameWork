 (function (angular) {

     'use strict';

     /**
      * @ngInject
      */
     function VisualStationController($scope, $sce, $timeout) {
         var self = this;
         self.result = {
             messageInfo: 'Welcome to visualStation Page'
         };
         self.operateContainerStyle = {};
         self.mapContainerStyle = {};
         self.buildingViewContainerStyle = {};
         self.$onInit = $onInit;
         self.$onDestroy = $onDestroy;
         self.onChangeMessage = onChangeMessage;
         self.onAddFeatureLayer = onAddFeatureLayer;
         self.onLocationFeature = onLocationFeature;

         function $onInit() {
             registerEventListener();
         }

         function $onDestroy() {

         }

         function registerEventListener() {
             $scope.$on('feature-selected-featureLayer', featureSelectedHandle);
         }

         function onChangeMessage() {
             self.result.messageInfo = "aaa";
             console.log("onChangeMessage");
             self.operateContainerStyle = {
                 width: '0',
                 visible: 'none'
             };
             self.mapContainerStyle = {
                 left: '0'
             };
             $timeout(function () {
                 $scope.$broadcast('gis-updateMap', 'updateMap');
             }, 1000);

         }

         function onAddFeatureLayer() {
             $scope.$broadcast('gis-addFeatureLayer', 'addFeatureLayer');
         }

         function onLocationFeature() {
             $scope.$broadcast('gis-locationFeature', 'locationFeature');
         }

         function featureSelectedHandle(event, data) {
             var value = data.layer + "： " + data.features.length + "  :  " + data.features[0].getId();
             console.log(self.result.messageInfo); //父级能得到值  
             self.result.messageInfo = value;
             console.log(self.result.messageInfo); //父级能得到值  
             event.stopPropagation();
             $scope.$apply();
         }
         //

     }

     var visualStation = {
         bindings: {},
         cache: 'false',
         controller: VisualStationController,
         templateUrl: 'views/visualStation/visualStation.html'
     };

     angular.module('visualStation').component('visualStation', visualStation, ['$scope']);

 })(angular);