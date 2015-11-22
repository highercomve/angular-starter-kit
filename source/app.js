import angular from 'angular'
import components from './components'
import services from './services'
import partials from './partials'
import routes from './conf/routes'
const node_env = process.env.NODE_ENV || 'development'

angular.module('App', [
  'App.components',
  'App.partialsPrecompile',
  'App.services',
  'App.routes'
])

angular.module('App').constant('ENV', {
  app_name: 'New app',
  type: node_env,
})

angular.bootstrap(document.body, ['App'])

// angular.module('App').run(function() {
//   console.log('Running Angular with browserify')
// })
