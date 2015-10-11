export default function(ngComponent) {
  ngComponent.directive('exampleDirective', ExampleDirective)

  function ExampleDirective() {
    return {
      restrict: 'E',
      templateUrl: 'example/directive.html',
      link(scope, element, attrs) {
      },
    }
  }
}
