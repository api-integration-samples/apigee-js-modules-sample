let assert = require('assert');
let bqFunctions = require('../src/bigquery_functions');
let bigquery_row = require('./data/bigquery_row.json');
let bigquery_rows1 = require('./data/bigquery_rows1.json');
let bigquery_rows2 = require('./data/bigquery_rows2.json');
let bigquery_fihr_rows2 = require('./data/bigquery_fihr.json');

describe('#generateBigQueryQuery("")', function() {
  it('should return an empty string', function() {
    assert.strictEqual(bqFunctions.generateQuery("", ""), "");
  });
});

describe('#generateBigQueryQuery("", "test_table")', function() {
  it('should return a simple query', function() {
    assert.strictEqual(bqFunctions.generateQuery("", "test_table"), "SELECT * FROM test_table   LIMIT 10 ");
  });
});

describe('#convertBigQueryResponseSingle()', function() {
  it('should return a JSON record', function() {
    let response = bqFunctions.convertResponse(bigquery_row, "transactions");
    assert.notEqual(response, "");
  });
});

describe('#convertBigQueryResponse10Rows()', function() {
  it('should return a JSON record', function() {
    let response = bqFunctions.convertResponse(bigquery_rows1, "transactions");
    assert.notEqual(response, "");
  });
});

describe('#convertBigQueryResponse10Rows2()', function() {
  it('should return a JSON record', function() {
    let response = bqFunctions.convertResponse(bigquery_rows2, "transactions");
    assert.notEqual(response, "");
  });
});

describe('#convertBigQueryFihrRows2()', function() {
  it('should return a JSON record', function() {
    let response = bqFunctions.convertResponse(bigquery_fihr_rows2, "transactions");
    console.log(JSON.stringify(response, "2"));
    assert.notEqual(response, "");
  });
});