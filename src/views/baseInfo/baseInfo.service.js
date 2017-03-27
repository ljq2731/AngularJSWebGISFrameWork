  (function (angular) {

      'use strict';

      /**
       * @Injector
       */
      function BaseInfoService() {
          var self = this;          
          var thisIsPrivate = "Private";

          self.variable = "This is public";

          self.getPrivate = function () {
              return thisIsPrivate;
          };

      }


      /**
       * @Inject
       */
      angular.module('baseInfo').service('baseInfoService', BaseInfoService);

      console.log("baseInfo  Service !");

  })(angular);