export default function(ngComponent) {
  ngComponent.factory('exampleFactory', ExampleFactory)

  function ExampleFactory($resource) {
    let privateVariable
    let Model = $resource('/url/:id', { id: '@id'})

    Model.prototype.publicVariable = 'Data'

    Model.classMethod = () => {

    }

     Model.prototype.instanceMethod = () => {

    }  

    function PrivateFunction() {

    }
    return Model
  }
}
