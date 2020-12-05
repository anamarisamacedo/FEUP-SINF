var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDcxNjg2MTEsImV4cCI6MTYwNzE4MzAxMSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.ybNr2FlMLD2vzOCas686-86Ph9LSyx5adx551yNwQxQPVmPYTIDHNZAuBukaUoH5aKds5kJxhNkgQtnkGgeyKSAsMa0GssvjXzjkNHbT85PvzmeiTFNdcEGIzXTFr9SXqEklvAsFv2t_0YFchg7vWJ4T_fOp11-soe5EiZQ844m7WCAlwHxjLXgKxFjjKKEuaYQU8tYame11uub2TsObvi_pbpS3HqQD94Nn_5C4eNeSe4efvWNG-HtaLhzaNJmrtIYK1xt1y5Y9d1ei1jEeNv-sVczsZ_Xp1NqmhretfP5DXmQWeuGAbbLz-Qbp2T3fwj7p1AK57XCVCh_Il4IY4Q';

const token = {
  getToken() {
    //ToDo
    return tempToken;
    request(
      {
        url: "https://identity.primaverabss.com/core/connect/token",
        method: "POST",
        auth: {
          user: "SINF04YAPP", // TODO : put your application client id here
          pass: "e96765b7-7fc8-4770-8b6b-0e44cd172308", // TODO : put your application client secret here
        },
        header: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
        form: {
          grant_type: "client_credentials",
          scope: "application",
        },
      },
      function (err, res) {
        if (res) {
          var json = JSON.parse(res.body);
          console.log("Access Token:", json.access_token);
          return json.access_token;
        } else {
          console.log("Could not obtain acess token.");
          return null;
        }
      }
    );
  },
};

export default token;
