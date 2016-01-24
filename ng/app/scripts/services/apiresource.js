'use strict';

/**
 * @ngdoc service
 * @name bitacoraApp.APIResource
 * @description
 * # APIResource
 * Factory in the bitacoraApp.
 */
angular.module('bitacoraApp')
  .factory('APIResource', APIResource);

APIResource.$inject = ['Bitacora'];
function APIResource(Bitacora) {
  var service = {
    bitacora: Bitacora
  };

  return service;

  ////////////
  
}
