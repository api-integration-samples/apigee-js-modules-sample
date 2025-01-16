# apigee-js-modules-sample
This is a project for doing common Google Cloud Javascript conversions that can be easily used in Apigee proxies and Application Integration workflows. Often the Google Cloud APIs return non-JSON data structures, and so these conversions can convert to pure JSON results that can be returned to clients.

## Conversions currently supported
- BigQuery input parameters to SQL statement
- BigQuery response to JSON
- Firestore response to JSON
- Gemini answer to string with token lengths
- Sensitive data protection masking of results

## Install

```bash
# Cone repository

# Install dependencies
npm i

# Run tests
npm run test
```

You should get these results.

```
  #generateBigQueryQuery("")
    ✔ should return an empty string

  #generateBigQueryQuery("", "test_table")
    ✔ should return a simple query

  #convertBigQueryResponseSingle()
    ✔ should return a JSON record

  #convertBigQueryResponse10Rows()
    ✔ should return a JSON record

  #convertBigQueryResponse10Rows2()
    ✔ should return a JSON record

  #convertDataProtectionResponse()
    ✔ should mask sensitive telephone number and birth location data

  #convertFirestoreResponse1()
    ✔ should return a JSON record

  #convertFirestoreRequest1
    ✔ should return a Firestore request JSON record

  #convertGeminiResponse()
    ✔ should return a JSON record
    ✔ should return a the correct request & response token length


  9 passing (6ms)
```

You can explore the conversions and test data used in the `./test` directory. The files under `./src` can be copied and used directly in Apigee proxies or Application Integration flows (pure JS exported CommonJS functions).
