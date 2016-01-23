'use strict';

/**
 * @ngdoc function
 * @name bitacoraApp.controller:BitacoraCtrl
 * @description
 * # BitacoraCtrl
 * Controller of the bitacoraApp
 */
angular.module('bitacoraApp')
  .controller('BitacoraCtrl', BitacoraCtrl);

function BitacoraCtrl() {
  this.fecha = new Date();
  this.maxDate = new Date();
};
