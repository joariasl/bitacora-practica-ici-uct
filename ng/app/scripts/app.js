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
    'ngMaterial',
    'angular-loading-bar'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
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
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('SessionInjector');
  }])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.parentSelector = '.header';
  }])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
  })
  .constant('API_BASEURL', '/api')
  .run(function($rootScope, API_BASEURL){
    $rootScope.API_BASEURL = API_BASEURL;
  });


////////////

authenticate.$inject = ['$q', '$state', '$timeout', 'GoogleSignIn', '$rootScope'];
function authenticate($q, $state, $timeout, GoogleSignIn, $rootScope) {
  var deferred = $q.defer();
  var loadSignIn = GoogleSignIn.loadSignIn()
    .finally(function(){
      $rootScope.isAuthenticated = GoogleSignIn.isAuthenticated();// Identify session ein global model
      if ($rootScope.isAuthenticated) {
        // Resolve the promise successfully
        console.log('Logueado');
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
