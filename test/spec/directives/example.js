'use strict';

describe('Test ExampleDirective', function() {
  
  beforeEach(module('App'));

  var compile, rootScope;

  beforeEach(inject(function($compile, $rootScope) {
    compile = $compile;
    rootScope = $rootScope
  }));

  it('render directive with message',function() {
    var message = "Testing message"
    var element = compile("<example-directive message='"+message+"'></example-directive>")(rootScope);
    rootScope.$digest();
    expect(element.html()).toContain(message);
  })
})
