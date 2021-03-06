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

ContenidoCtrl.$inject = ['$state', '$stateParams', '$filter', '$mdDialog', 'Toast', 'Contenido'];
function ContenidoCtrl($state, $stateParams, $filter, $mdDialog, Toast, Contenido) {
  var vm = this;
  vm.cargarContenido = cargarContenido;
  vm.guardarContenido = guardarContenido;
  vm.eliminarConfirm = eliminarConfirm;
  vm.loadContent = loadContent;
  vm.dateBack = dateBack;
  vm.dateNext = dateNext;

  vm.contenido = {};

  if($stateParams.fecha){
    vm.fecha = dateParseLocal($stateParams.fecha+'T00:00:00');// Guardar fecha de $stateParam en modelo y datepicker
    vm.cargarContenido();
  }else{
    // Si no hay fecha de ingreso, cargar fecha de hoy
    vm.fecha = new Date();// Si no está definido se va al día actual
    vm.loadContent();// Cargar datos al inicio redireccionando a la fecha si no se define alguna
  }

  ////////////

  function cargarContenido(){
    vm.contenido = {};
    vm.contenido = Contenido.get({ fecha: dateFormat(vm.fecha) }, function(data){
      //vm.contenido = data;// Retorna datos junto a operaciones ngResource
      vm.fecha = dateParseLocal(data.bita_fecha+'T00:00:00');
    });
  }

  function guardarContenido(){
    vm.contenido.bita_fecha = dateFormat(vm.fecha);// Pasar fecha seleccionada a modelo
    //vm.contenido = new Contenido(vm.contenido);// Crear nueva instancia usando datos ya contenidos, pasados parametros para obtener objeto nuevo instanciado con operaciones ngResource
    vm.contenido.$save().then(function(result){
      Toast.show('¡Guardado!');
    }, function(rejection){
      var status = rejection.status;
      if (status == 500) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Internal Server Error')
            .textContent('No se pudo concretar la operación en el servidor.')
            .ariaLabel('Internal Server Error')
            .ok('Aceptar')
        );
      } else {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Error')
            .textContent('No se pudo concretar la operación.')
            .ariaLabel('Error')
            .ok('Aceptar')
        );
      }
    });
  }

  function eliminarConfirm(){
    var confirm = $mdDialog.confirm()
          .title('¿Eliminar contenido del día '+vm.fecha.toLocaleDateString()+'?')
          .textContent('Esta acción no se podrá deshacer.')
          .ariaLabel('Confirmar Eliminar')
          .ok('Aceptar')
          .cancel('Cancelar');
    $mdDialog.show(confirm).then(function() {
        eliminarContenido();
      });
  }

  function eliminarContenido(){
    vm.contenido.bita_fecha = dateFormat(vm.fecha);// Pasar fecha seleccionada a modelo
    vm.contenido.$delete(function(){
      Toast.show('¡Eliminado!');
      cargarContenido();
    });
  }

  function loadContent(){
    $state.go('contenido', { fecha: dateFormat(vm.fecha) },{
      // prevent the events onStart and onSuccess from firing
      notify:false,
      // prevent reload of the current state
      reload:false,
      // replace the last record wY
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
    vm.fecha = new Date(
      vm.fecha.getFullYear(),
      vm.fecha.getMonth(),
      vm.fecha.getDate() + 1);
    vm.loadContent();
  }

  function dateFormat(date){
    return $filter('date')(date, 'yyyy-MM-dd');
  }

  function dateParseLocal(str_date){
    var date = new Date(Date.parse(str_date));
    date.setTime(date.getTime()+date.getTimezoneOffset()*60000);
    return date;
  }
};
