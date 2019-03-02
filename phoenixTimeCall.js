const { google } = require("googleapis");
const sheets = google.sheets("v4");
const http = require("http");
const querystring = require("query-string");

authorize(function(authClient) {
  const request = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: "1MrMwNerILxNK0lvKCBklkYZx_OKAb4io8XdaldRyO_g", // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    range: "B11:D11", // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.

    auth: authClient
  };

  sheets.spreadsheets.values.get(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }
    const postData = querystring.stringify({
      id: 1,
      description: "Phoenix Timer",
      responseData: response.data.values[0]
    });

    const options = {
      host: "localhost",
      port: 3001,
      path: "/times/1",
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData)
      }
    };
    const req = http.request(options, res => {
      res.setEncoding("utf8");
      res.on("data", chunk => {
        console.log(`BODY: ${chunk}`);
      });
      res.on("end", () => {
        console.log("No more data in response.");
      });
    });

    req.on("error", e => {
      console.error(`problem with request: ${e.message}`);
    });

    // write data to request body
    req.write(postData);
    req.end();
  });
});

function authorize(callback) {
  // TODO: Change placeholder below to generate authentication credentials. See
  // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
  //
  // Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/drive.readonly'
  //   'https://www.googleapis.com/auth/spreadsheets'
  //   'https://www.googleapis.com/auth/spreadsheets.readonly'
  const authClient = "AIzaSyBiFHKMbvY9jB9CPsxINcszXQUCZKKw4Go";

  if (authClient == null) {
    console.log("authentication failed");
    return;
  }
  callback(authClient);
}
