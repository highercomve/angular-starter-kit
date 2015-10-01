import angular from 'angular'
import uiRouter from 'angular-ui-router'

let routes = angular.module('App.routes', ['ui.router'])

routes.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./partials/home.html"
    })
  $urlRouterProvider.otherwise("/")
})

export default routes
