(function (angular) {

    'use strict';

    /**
     * @Inject
     */
    angular.module('monitor').factory('MonitorService', function () {
      // Simulate a service
      return {
        getMonitorInfos: function () {
          return 'From monitorService: Here is a list of monitor';
        }
      };
    });

  console.log("Hello monitor factory !");

 })(angular);