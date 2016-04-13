export default function(ngComponent) {
  ngComponent.controller('exampleController', ExampleController)

  function ExampleController($scope, exampleFactory) {
    $scope.helloMessage = "Hello from a controller router"
  }
}
