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

BitacoraCtrl.$inject = ['Bitacora'];
function BitacoraCtrl(Bitacora) {
  var vm = this;

  vm.bitacora = Bitacora.query();
};
