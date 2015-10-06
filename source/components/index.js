import angular from 'angular'

const components = angular.module('App.components', [])

// components.run(() => {
//   console.log('Running directives module')
// })

// How to add controller to the components module
components.controller('exampleController', require('./example/controller'))

// How to add a directive to the components module
components.directive('exampleDirective', require('./example/directive'))

export default components
