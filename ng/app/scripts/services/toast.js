'use strict';

/**
 * @ngdoc service
 * @name bitacoraApp.Toast
 * @description
 * # Toast
 * Factory in the bitacoraApp.
 */
angular.module('bitacoraApp')
  .service('Toast', Toast);

Toast.$inject = ['$mdToast', '$document'];
function Toast($mdToast, $document) {
  var vm = this;
  vm.show = show;

  function show($msg){
    var toast = $mdToast.simple()
      .textContent($msg)
      .action('OK')
      .parent($document[0].querySelector('#toastBounds'));
    $mdToast.show(toast);
  }

}
