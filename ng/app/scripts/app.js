'use strict';

/**
 * @ngdoc overview
 * @name bitacoraApp
 * @description
 * # bitacoraApp
 *
 * Main module of the application.
 */
angular
  .module('bitacoraApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngMaterial'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/bitacora");
    $stateProvider
      .state('bitacora', {
        url: '/bitacora',
        templateUrl: 'views/bitacora.html',
        controller: 'BitacoraCtrl',
        controllerAs: 'bitacora'
      })
      .state('contenido', {
        url: '/contenido/:fecha',
        templateUrl: 'views/contenido.html',
        controller: 'ContenidoCtrl',
        controllerAs: 'contenido'
      });
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
  })
  .constant('API_BASEURL', '/api');
