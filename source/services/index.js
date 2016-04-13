import angular from 'angular'
// You can add here dependencies that
// import ngResource from 'ng-resource'

// the ng-resource library, don't autoexecute therefore:
// ngResource(window, angular)

angular.module('App.services', [])

let services = angular.module('App.services')

// services.run(() => {
//   console.log('Running services module')
// })

// How to add factories or services to the services module
require('./example-factory.js')(services)

export default services
