'use strict';

/**
 * @ngdoc function
 * @name bitacoraApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bitacoraApp
 */
angular.module('bitacoraApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$state', '$rootScope', 'GoogleSignIn'];
function MainCtrl($state, $rootScope, GoogleSignIn) {
  var vm = this;
  vm.signOut = signOut;

  ////////////

  function signOut(){
    GoogleSignIn.auth2.signOut().then(function () {
      $rootScope.isAuthenticated = false;
      $state.go('home');
    });
  }
};
