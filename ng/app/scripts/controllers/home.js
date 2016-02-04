'use strict';

/**
 * @ngdoc function
 * @name bitacoraApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the bitacoraApp
 */
angular.module('bitacoraApp')
  .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$state', 'GoogleSignIn'];
function HomeCtrl($state, GoogleSignIn) {
  var vm = this;

  var loadSignIn = GoogleSignIn.loadSignIn()
    .finally(function(){
      if(GoogleSignIn.isAuthenticated()){
        $state.go('bitacora');
      }else{
        renderLoginButton();
      }
    });

  ////////////

  function renderLoginButton() {
    gapi.signin2.render(angular.element('.g-signin2')[0], {
      'theme': 'dark',
      'onsuccess': onSuccess
    });
  }

  function onSuccess(googleUser){
    $state.go('bitacora');
  }
};
