

function convertResponse(dataResponseObject) {
  var result = {text: "", requestTokenLength: 0, responseTokenLength: 0};

  for (i = 0; i < dataResponseObject.length; i++) {
    if (dataResponseObject[i]["candidates"][0]["content"] && dataResponseObject[i]["candidates"][0]["content"]["parts"] && dataResponseObject[i]["candidates"][0]["content"]["parts"].length > 0)
      result.text += dataResponseObject[i]["candidates"][0]["content"]["parts"][0]["text"];

    if (dataResponseObject[i]["usageMetadata"]) {
      result.requestTokenLength = dataResponseObject[i]["usageMetadata"]["promptTokenCount"];
      result.responseTokenLength = dataResponseObject[i]["usageMetadata"]["candidatesTokenCount"];
    }
  }

  return result;
}

// this is to only export the function if in node
if (typeof exports !== 'undefined') {
  exports.convertResponse = convertResponse;
}