let assert = require('assert');
firestoreFunctions = require('../src/firestore_functions');
firestoreRequest1 = require('./data/firestore_request_1.json');
firestoreAnswer1 = require('./data/firestore_response_1.json');

describe('#convertFirestoreResponse1()', function() {
  it('should return a JSON record', function() {
    let response = undefined;
    response = firestoreFunctions.convertResponse(firestoreAnswer1);
    assert.notEqual(response, undefined);
    assert.equal(response.name, "test-doc1");
    assert.equal(response.roles.length, 2);
  });
});

describe('#convertFirestoreRequest1', function() {
  it("should return a Firestore request JSON record", function() {
    let request = undefined;
    request = firestoreFunctions.convertRequest(firestoreRequest1);

    assert.notEqual(request, undefined);
    assert.equal(request.mapValue.fields.name.stringValue, "test-doc1");
  })
});
