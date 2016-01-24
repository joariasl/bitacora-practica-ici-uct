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

BitacoraCtrl.$inject = ['APIResource'];
function BitacoraCtrl(APIResource) {
  var vm = this;

  vm.bitacora = APIResource.bitacora.query();
};
