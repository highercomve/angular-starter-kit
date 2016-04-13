export default function(ngComponent) {
  ngComponent.directive('exampleDirective', ExampleDirective)

  function ExampleDirective() {
    return {
      restrict: 'E',
      templateUrl: 'example_directive/template.html',
      link(scope, element, attrs) {
        scope.message = attrs.message
      },
    }
  }
}
