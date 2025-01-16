let assert = require('assert');
let geminiFunctions = require('../src/gemini_functions');
let gemini_answer_1 = require('./data/gemini_answer_1.json');

describe('#convertGeminiResponse()', function() {
  it('should return a JSON record', function() {
    let response = geminiFunctions.convertResponse(gemini_answer_1);
    assert.equal(response.text.length, 1615);
  });

  it('should return a the correct request & response token length', function() {
    let response = geminiFunctions.convertResponse(gemini_answer_1);
    assert.equal(response.requestTokenLength, 6);
    assert.equal(response.responseTokenLength, 309);
  });
});
