import angular from 'angular'
import uiRouter from 'angular-ui-router'

let routes = angular.module('App.routes', ['ui.router'])

routes.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      controller: 'exampleController',
      templateUrl: "example_controller/template.html"
    })
  $urlRouterProvider.otherwise("/")
})

export default routes
