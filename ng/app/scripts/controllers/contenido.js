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

ContenidoCtrl.$inject = ['$state', '$stateParams', 'APIResource'];
function ContenidoCtrl($state, $stateParams, APIResource) {
  var vm = this;
  vm.cargarContenido = cargarContenido;
  vm.loadContent = loadContent;
  vm.dateBack = dateBack;
  vm.dateNext = dateNext;

  vm.contenido = {};

  if($stateParams.fecha){
    vm.fecha = new Date($stateParams.fecha+'T00:00:00');// Guardar fecha de $stateParam en modelo y datepicker
    vm.cargarContenido();
  }else{
    // Si no hay fecha de ingreso, cargar fecha de hoy
    vm.fecha = new Date();// Si no está definido se va al día actual
    vm.loadContent();// Cargar datos al inicio redireccionando a la fecha si no se define alguna
  }

  ////////////

  function cargarContenido(){
    vm.contenido = {};
    APIResource.bitacora.contenido.get({ fecha: vm.fecha.toLocaleFormat('%Y-%m-%d') }, function(data){
      vm.contenido = data;
      vm.fecha = new Date(data.bita_fecha+'T00:00:00');
    });
  }

  function loadContent(){
    $state.go('contenido', { fecha: vm.fecha.toLocaleFormat('%Y-%m-%d') },{
      // prevent the events onStart and onSuccess from firing
      notify:false,
      // prevent reload of the current state
      reload:false,
      // replace the last record when changing the params so you don't hit the back button and get old params
      location:'replace',
      // inherit the current params on the url
      inherit:true
    });
    vm.cargarContenido();
  }

  function dateBack(){
    vm.fecha = new Date(
      vm.fecha.getFullYear(),
      vm.fecha.getMonth(),
      vm.fecha.getDate() - 1);
    vm.loadContent();
  }

  function dateNext(){
    console.log(vm.fecha);
    vm.fecha = new Date(
      vm.fecha.getFullYear(),
      vm.fecha.getMonth(),
      vm.fecha.getDate() + 1);
    vm.loadContent();
  }
};
