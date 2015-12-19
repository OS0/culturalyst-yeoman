'use strict';

describe('Directive: uploadContent', function () {

  // load the directive's module and view
  beforeEach(module('culturalystApp'));
  beforeEach(module('components/uploadContent/uploadContent.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<upload-content></upload-content>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uploadContent directive');
  }));
});
