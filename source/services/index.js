import angular from 'angular'
import ngResource from 'ng-resource'

// the ng-resource librery, don't autoexecute therefore:
ngResource(window, angular)

angular.module('App.services', ['ngResource'])

let services = angular.module('App.services')

// services.run(() => {
//   console.log('Running services module')
// })

// How to add factories or services to the services module
require('./example-factory.js')(services)

export default services
