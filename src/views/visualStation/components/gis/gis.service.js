  (function (angular) {

      'use strict';

      /**
       * @ngInject
       */
      function GisService() {
          var self = this;
          var thisIsPrivate = "Private";

          self.getPrivate = function () {
              return thisIsPrivate;
          };
      }

      angular.module('common.gis').service('GisService', GisService);

  })(angular);