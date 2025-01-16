// Converts the response from the Firestore API to pure JSON
function convertResponse(dataResponseObject) {
  var result = documentToJson(dataResponseObject);
  return result;
}

function convertRequest(dataRequestObject) {
  var result = jsonToDocument(dataRequestObject);
  return result;
}

// This is to only export the function if in node for tests
if (typeof exports !== 'undefined') {
  exports.convertResponse = convertResponse;
  exports.convertRequest = convertRequest;
}

function jsonToDocument(value) {
  if (!value) {
    return {
      'nullValue': null
    };
  } else if (!isNaN(value)) {
    if (value.toString().indexOf('.') != -1)
      return {
        'doubleValue': value
      };
    else
      return {
        'integerValue': value
      };
  } else if (value === 'true' || value === 'false' || typeof value == 'boolean') {
    return {
      'booleanValue': value
    };
  } else if (Date.parse(value)) {
    return {
      'timestampValue': value
    };
  } else if (typeof value == 'string') {
    return {
      'stringValue': value
    };
  } else if (value && value.constructor === Array) {
    return {
      'arrayValue': {
        values: value.map(v => jsonToDocument(v))
      }
    };
  } else if (typeof value === 'object') {
    var obj = {};
    for (var o in value) {
      obj[o] = jsonToDocument(value[o]);
    }
    return {
      'mapValue': {
        fields: obj
      }
    };
  }

}

function documentToJson(fields) {
  var result = {};
  for (var f in fields) {
    var key = f,
      value = fields[f],
      isDocumentType = ['stringValue', 'booleanValue', 'doubleValue',
        'integerValue', 'timestampValue', 'mapValue', 'arrayValue', 'nullValue'
      ].find(t => t === key);
    if (isDocumentType) {
      var item = ['stringValue', 'booleanValue', 'doubleValue', 'integerValue', 'timestampValue', 'nullValue']
        .find(t => t === key)
      if (item)
        return value;
      else if ('mapValue' == key)
        return documentToJson(value.fields || {});
      else if ('arrayValue' == key) {
        var list = value.values;
        return !!list ? list.map(l => documentToJson(l)) : [];
      }
    } else {
      result[key] = documentToJson(value)
    }
  }
  return result;
}