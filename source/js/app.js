import angular from 'angular'
import services from './services/all'
import controllers from './controllers/all'
import directives from './directives/all'
import partials from './partials/all'
import routes from './routes'

angular.module('App', [
  'App.directives',
  'App.partialsPrecompile',
  'App.services',
  'App.controllers',
  'App.routes'
])

angular.bootstrap(document.body, ['App'])

// angular.module('App').run(function() {
//   console.log('Running Angular with browserify')
// })
