'use strict';

/**
 * @ngdoc service
 * @name bitacoraApp.Bitacora
 * @description
 * # Bitacora
 * Factory in the bitacoraApp.
 */
angular.module('bitacoraApp')
  .factory('Bitacora', Bitacora);

Bitacora.$inject = ['$resource', 'API_BASEURL'];
function Bitacora($resource, API_BASEURL) {
  var service = $resource(API_BASEURL+'/bitacora');

  return service;
}
