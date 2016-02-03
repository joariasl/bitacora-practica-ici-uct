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
    $urlRouterProvider.otherwise("/home");
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home',
        resolve: { authenticate: authenticate }
      })
      .state('bitacora', {
        url: '/bitacora',
        templateUrl: 'views/bitacora.html',
        controller: 'BitacoraCtrl',
        controllerAs: 'bitacora',
        resolve: { authenticate: authenticate }
      })
      .state('contenido', {
        url: '/contenido/:fecha',
        templateUrl: 'views/contenido.html',
        controller: 'ContenidoCtrl',
        controllerAs: 'contenido',
        resolve: { authenticate: authenticate }
      });
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
  })
  .constant('API_BASEURL', '/api');


////////////

authenticate.$inject = ['$q', '$state', '$timeout', 'GoogleSignIn'];
function authenticate($q, $state, $timeout, GoogleSignIn) {
  var deferred = $q.defer();
  var loadSignIn = GoogleSignIn.loadSignIn()
    .finally(function(){
      if (GoogleSignIn.isAuthenticated()) {
        // Resolve the promise successfully
        console.log('Logueado', $state, $state.current.name);
        deferred.resolve();
      } else {
        console.log('NO Logueado');
        $timeout(function() {
          // This code runs after the authentication promise has been rejected.
          // Go to the log-in page
          $state.go('home');
        });
        deferred.reject();
      }
    });

  return deferred.promise;
}
