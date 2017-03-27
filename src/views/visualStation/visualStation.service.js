  (function (angular) {

      'use strict';

      /**
       * @ngInject
       */
      function VisualStationService() {
          var self = this;          
          var thisIsPrivate = "Private";

          self.variable = "This is public";

          self.getPrivate = function () {
              return thisIsPrivate;
          };

      }

      angular.module('visualStation').service('VisualStationService', VisualStationService);

  })(angular);