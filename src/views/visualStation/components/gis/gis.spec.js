'use strict';
describe('component: gis', function () {
  var $componentController;

  beforeEach(module('common.gis'));

  var $ctrl, $scope;
  beforeEach(inject(function (_$rootScope_, _$componentController_) {
    $scope = _$rootScope_.$new();
    $ctrl = _$componentController_('gis', {
      $scope: $scope
    });
  }));

  it('$onInit should be defined', function () {
    expect($ctrl.$onInit).toBeDefined();
  });
});