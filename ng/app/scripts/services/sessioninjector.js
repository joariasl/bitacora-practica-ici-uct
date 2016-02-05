'use strict';

/**
 * @ngdoc service
 * @name bitacoraApp.SessionInjector
 * @description
 * # SessionInjector
 * Factory in the bitacoraApp.
 */
angular.module('bitacoraApp')
  .factory('SessionInjector', SessionInjector);

SessionInjector.$inject = [];
function SessionInjector() {
  var sessionInjector = {
    request: function(config) {
      if(typeof(gapi) != "undefined" && typeof(gapi.auth2) != "undefined" && gapi.auth2.getAuthInstance() != undefined){
        config.headers['x-session-token'] = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
      }
      return config;
    }
  };

  return sessionInjector;
}
