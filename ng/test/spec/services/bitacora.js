'use strict';

describe('Service: Bitacora', function () {

  // load the service's module
  beforeEach(module('bitacoraApp'));

  // instantiate service
  var Bitacora;
  beforeEach(inject(function (_Bitacora_) {
    Bitacora = _Bitacora_;
  }));

  it('should do something', function () {
    expect(!!Bitacora).toBe(true);
  });

});
