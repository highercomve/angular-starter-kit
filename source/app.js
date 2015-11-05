import angular from 'angular'
import components from './components'
import services from './services'
import partials from './partials'
import routes from './conf/routes'

angular.module('App', [
  'App.components',
  'App.partialsPrecompile',
  'App.services',
  'App.routes'
])

angular.bootstrap(document.body, ['App'])

// angular.module('App').run(function() {
//   console.log('Running Angular with browserify')
// })
