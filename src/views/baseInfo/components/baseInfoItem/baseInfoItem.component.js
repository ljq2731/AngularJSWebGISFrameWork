 (function (angular) {

    'use strict';

    /**
     * @Injector
     */
    function BaseInfoItemController() {
        var self = this;
        self.message = 'Welcome to BaseInfoItem Page';
    }

    var baseInfoItem = {
        bindings: {},
        controller: BaseInfoItemController,
        templateUrl: 'views/baseInfo/components/baseInfoItem/baseInfoItem.html'
    };

    angular.module('baseInfoItem').component('baseInfoItem', baseInfoItem);

    console.log("Welcome baseInfoItem component");

})(angular);