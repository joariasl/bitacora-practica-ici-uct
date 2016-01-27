'use strict';

describe('Service: Contenido', function () {

  // load the service's module
  beforeEach(module('bitacoraApp'));

  // instantiate service
  var Contenido;
  beforeEach(inject(function (_Contenido_) {
    Contenido = _Contenido_;
  }));

  it('should do something', function () {
    expect(!!Contenido).toBe(true);
  });

});
