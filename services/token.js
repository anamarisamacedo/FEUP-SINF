var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc2Nzc0MDgsImV4cCI6MTYwNzY5MTgwOCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.HZzBC7YwR2NhuSXQ_BAL-Y4bV-UjJmGPGv8GpZBkTPyDghSRkYAuXxSKtMC_b1OES7dkawH5W0KlmN9tg_7AXLnjwXlQvpKm8iUKrx-cOc3dHraJ8UJ1oIWxcAjCrGEUup4HqfC-tUb8EViifTNcyOAAwFKuTePYjlJr7IiYwVNo10dDyhSvkYQwL7x4O2LE26v2cA-AejbGZb-62vY6fF97vLahQEZubamvExzoEtNtmjzEsqTCGRLqFLq3CUW5BVsOzpBJVFil8JteEwb93oBr4qZsJZOOomUUp4ZV-dJDtsslTVdcI9t9IsPDrBL6LPM2dulNBvMTpohdj4rcLQ';

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
