let assert = require('assert');
let sensitiveDataProtectionFunctions = require('../src/data_protection_functions');
let response_1 = require('./data/data_protection_response_1.json');

describe('#convertDataProtectionResponse()', function() {
  it('should mask sensitive telephone number and birth location data', function() {
    let response = sensitiveDataProtectionFunctions.maskSensitiveText("My phone number is (800) 555-0123. I was born in France.", response_1);
    assert.equal(response[19], '*');
    assert.equal(response[49], '*');
  });
});
