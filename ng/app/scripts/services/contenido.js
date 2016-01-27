'use strict';

/**
 * @ngdoc service
 * @name bitacoraApp.Contenido
 * @description
 * # Contenido
 * Factory in the bitacoraApp.
 */
angular.module('bitacoraApp')
  .factory('Contenido', Contenido);

Contenido.$inject = ['$resource', 'API_BASEURL'];
function Contenido($resource, API_BASEURL) {
  var service = $resource(API_BASEURL+'/bitacora/contenido/:fecha');

  return service;
}
