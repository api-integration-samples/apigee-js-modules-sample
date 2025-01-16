function maskSensitiveText(text, response) {
  var result = text;

  if (response.result && response.result.findings && response.result.findings.length > 0) {
    for (i = 0; i < response.result.findings.length; i++) {
      var start = response.result.findings[i].location.codepointRange.start;
      var end = response.result.findings[i].location.codepointRange.end;
      result = result.substring(0, start) + "*".repeat(end - start) + result.substring(end);
    }
  }

  return result;
}

// this is to only export the function if in node
if (typeof exports !== 'undefined') {
  exports.maskSensitiveText = maskSensitiveText;
}