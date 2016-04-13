'use strict';

describe('Controller: exampleController', function () {

  // load the controller's module
  beforeEach(module('App'));

  var exampleController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    exampleController = $controller('exampleController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a helloMessage to the scope', function () {      
    expect(scope.helloMessage).toBe("Hello from a controller router");
  });
});
