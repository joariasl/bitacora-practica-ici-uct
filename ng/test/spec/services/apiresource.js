'use strict';

describe('Service: APIResource', function () {

  // load the service's module
  beforeEach(module('bitacoraApp'));

  // instantiate service
  var APIResource;
  beforeEach(inject(function (_APIResource_) {
    APIResource = _APIResource_;
  }));

  it('should do something', function () {
    expect(!!APIResource).toBe(true);
  });

});
