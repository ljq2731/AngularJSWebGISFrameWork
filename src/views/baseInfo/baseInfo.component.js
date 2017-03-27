 (function (angular) {

    'use strict';

    /**
     * @Injector
     */
    function BaseInfoController() {
        var self = this;
        self.message = 'Welcome to BaseInfo Page';
    }

    var baseInfo = {
        bindings: {},
        controller: BaseInfoController,
        templateUrl: 'views/baseInfo/baseInfo.html'
    };

    angular.module('baseInfo').component('baseInfo', baseInfo);

    console.log("Welcome baseInfo component");

})(angular);