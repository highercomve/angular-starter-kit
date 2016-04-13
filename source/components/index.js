import angular from 'angular'

angular.module('App.components', [])

const components = angular.module('App.components')

// components.run(() => {
//   console.log('Running directives module')
// })

// How to add controller to the components module
require('./example_controller')(components);

// How to add a directive to the components module
require('./example_directive')(components);

export default components
