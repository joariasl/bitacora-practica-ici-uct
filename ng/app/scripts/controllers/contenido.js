'use strict';

/**
 * @ngdoc function
 * @name bitacoraApp.controller:ContenidoCtrl
 * @description
 * # ContenidoCtrl
 * Controller of the bitacoraApp
 */
angular.module('bitacoraApp')
  .controller('ContenidoCtrl', ContenidoCtrl);

function ContenidoCtrl() {
  this.fecha = new Date();
  this.maxDate = new Date();
};
