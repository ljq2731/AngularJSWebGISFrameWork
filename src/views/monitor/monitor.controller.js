(function (angular) {

        'use strict';

        /**
         * @Injector
         */
        function MonitorController($scope, MonitorService) {
            $scope.message = 'Shows a list of monitors';
            $scope.monitorInfos = MonitorService.getMonitorInfos();
        }

        angular.module('monitor').controller('MonitorController', ['$scope', 'MonitorService', MonitorController]);

        console.log("Hello Monitor  Controller !");

        //
        //     var $injector = angular.injector(monitor);
        // $injector.invoke(function($compile, $rootScope) {  
        //                     $compile($("#monitorController"))($rootScope);  
        //                 });

        // $injector.invoke(function($rootScope, $compile, $document) {
        //     $compile($document)($rootScope);
        //     $rootScope.$digest();
        // });

        /*
        monitor.config([
                '$controllerProvider',
                '$compileProvider',
                '$filterProvider',
                '$provide',
                function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                    module.register = {
                        controller: $controllerProvider.register,
                        directive: $compileProvider.directive,
                        filter: $filterProvider.register,
                        factory: $provide.factory,
                        service: $provide.service,
                        value: $provide.value,
                        constant: $provide.constant
                    };
                }
            ]);
        */

 })(angular);