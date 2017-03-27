(function (angular) {

    'use strict';

    function AppController($scope, $state, $log) {
        var self = this;

        self.selectedItem = 'baseInfo';

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $log.debug('successfully changed states');
            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);
            self.selectedItem = toState.name;
        });
    }

    angular.module('app').controller('appController', ['$scope', '$state', '$log', AppController]);

})(angular);