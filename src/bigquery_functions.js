
function generateQuery(query, table, input_filter, order_by, page_size, page_token) {
  
  if (!page_size) page_size = "10";

  var filter = "";
  var orderBy = "";
  var pageSize = "";
  var pageToken = "";

  if (input_filter)
    filter = "WHERE " + input_filter;
  
  if (order_by)
    orderBy = "ORDER BY " + order_by;
  
  if (page_size) {
    pageSize = "LIMIT " + page_size;
  }

  if (page_token) {
    pageToken = "OFFSET " + parseInt(page_size) * (parseInt(page_token) - 1);
  }

  var newQuery = "";

  if (table)
    newQuery = "SELECT * FROM " + table + " %filter% %orderBy% %pageSize% %pageToken%";
  else
    newQuery = query;

  newQuery = newQuery.replace("%filter%", filter);
  newQuery = newQuery.replace("%orderBy%", orderBy);
  newQuery = newQuery.replace("%pageSize%", pageSize);
  newQuery = newQuery.replace("%pageToken%", pageToken);

  return newQuery;
}

function convertResponse(dataResponseObject, entity_name, page_token = "", fieldNameReplacements = {}) {

  var responseObject = {};

  responseObject[entity_name] = doConversionRows(dataResponseObject, dataResponseObject.schema.fields, fieldNameReplacements);

  if (page_token) {
    responseObject["next_page_token"] = parseInt(page_token) + 1;
  }
  else {
    responseObject["next_page_token"] = 2;
  }

  return responseObject;
}

function doConversionRows(inputObject, fields, fieldNameReplacements = {}) {
  var result = [];
  for (var rowKey in inputObject.rows) {
    var row = inputObject.rows[rowKey];
    result.push(doConversion(row, fields, fieldNameReplacements));
  }

  return result;
}

function doConversion(inputObject, fields, fieldNameReplacements = {}) {
  var result;
  if (inputObject.f) {
    // This is a field object, so collect properties
    result = {};
    for (var valueKey in inputObject.f) {
      var value = inputObject.f[valueKey];
      var type = fields[valueKey].type;
      var mode = fields[valueKey].mode;
      var name = fields[valueKey].name;
      if (fieldNameReplacements[name]) {
        name = fieldNameReplacements[name];
      }

      if (type != "RECORD") {
        // simple value
        result[name] = value.v;
      }
      else if (type === "RECORD" && mode === "REPEATED") {
        // child array
        result[name] = doConversion(value, fields[valueKey].fields, fieldNameReplacements);
      }
      else if (type === "RECORD") {
        // child object
        result[name] = doConversion(value, fields[valueKey].fields, fieldNameReplacements);
      }
    }
  }
  else if (inputObject.v) {
    // This is a value (or a sub-object)
    if (Array.isArray(inputObject.v)) {
      // This is an array
      result = [];
      for (var valueKey in inputObject.v) {
        var value = inputObject.v[valueKey];
        result = result.concat(doConversion(value, fields, fieldNameReplacements));
      }
    }
    else {
      // This is an object
      result = doConversion(inputObject.v, fields, fieldNameReplacements);
    }
  }

  return result;
}

// this is to only export the function if in node
if (typeof exports !== 'undefined') {
  exports.generateQuery = generateQuery;
  exports.convertResponse = convertResponse;
}