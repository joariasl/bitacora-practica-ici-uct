'use strict';

/**
 * @ngdoc service
 * @name bitacoraApp.GoogleSignIn
 * @description
 * # GoogleSignIn
 * Factory in the bitacoraApp.
 */
angular.module('bitacoraApp')
  .service('GoogleSignIn', GoogleSignIn);

GoogleSignIn.$inject = ['$q', '$state', '$interval'];
function GoogleSignIn($q, $state, $interval) {
  var vm = this;
  vm.loadSignIn = loadSignIn;
  vm.isAuthenticated = isAuthenticated;
  vm.getToken = getToken;

  vm.status = -1;// 0: Instanced/Pending/No process; 1: Resolved; 2: Rejected;

  vm.loadSignIn();

  function loadSignIn(){
    var deferred = $q.defer();

    if(vm.status < 0){
      vm.status = 0;
      // Reintentar hasta que gapi se haya definido o cargado
      var checker = $interval(function() {
        if (typeof(gapi) != "undefined") {
          if(typeof(gapi.auth2) == "undefined" || gapi.auth2.getAuthInstance() == undefined){
            gapi.load('auth2',function(){
              if(gapi.auth2.getAuthInstance() == undefined){
                vm.auth2 = gapi.auth2.init();// Equals gapi.auth2.getAuthInstance()
              }else{
                vm.auth2 = gapi.auth2.getAuthInstance();
              }
              vm.status = 1;
              deferred.resolve();
            });
          } else {
            vm.auth2 = gapi.auth2.getAuthInstance();// Equals gapi.auth2.getAuthInstance()
            vm.status = 1;
            deferred.resolve();
          }

          $interval.cancel(checker);
          checker = undefined;
        }
      }, 100);
    }else{
      // Chequear hasta que se haya definido estado cargado
      var checker = $interval(function() {
        if (vm.status == 1) {
          deferred.resolve();

          $interval.cancel(checker);
          checker = undefined;
        }
      }, 100);
    }

    return deferred.promise;
  };

  function isAuthenticated(){
    return vm.status == 1 && vm.auth2.currentUser.get().isSignedIn();
  };

  function getToken(){
    return vm.auth2.currentUser.get().getAuthResponse().id_token;// gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
  };
}
