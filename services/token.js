var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc5MDUyMjUsImV4cCI6MTYwNzkxOTYyNSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.gooiu8WpgGkgEHShKB71qfuwp_WR_5j9IzLznKUQASrFVMpNW_4k0RiaKfFkIZM0NJwX5E3Tl6R874AxmMouD-M80YDNhKr6fz2MQpWhG5v8E1xptM0uw2dh1y-qs4bHaEM5ZpKZK9MjFJkvkk2sNT4x_G7btwnNsbMCH3463PObqL51eZYhamQXvi1n3WjKRQ2sM4xF_8gmv9wAaTEikrimQPj40tw2jPpqtWqd1HVRGA0nQK7mbFF6005nmVgO0SDxEHOv-Pw3FXlW2TxsCXVbXrnAITuvRhaG5NH80EzUHMMvVK1aQBK4rLOtNRXE6mwV0MJc-Nz0J_PQS6GzOw';

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
