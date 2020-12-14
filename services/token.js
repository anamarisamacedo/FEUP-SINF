var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc5Mzc2NDYsImV4cCI6MTYwNzk1MjA0NiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.FWXp1Yzvs1jmcuS1Hk3AY86Is7MKT6gCIt3s0l7lbUuvtzW0jLlwI9dB9XsUUrgBiKMK4HBbrWttfL_go3sh28Jbr_xZTFt1xKpHMovrmZkadayFt-VUrb9TI7dL0bhYmhbo-gcvHjoMXNq7T4rIHnvgmdHGmlGN94zJmyosHKA87rQttXZR-khnSXPNjma_nd41Lt9cjgZF5OtL0xG7R2MjQDUFOA-KEHRuQbqqUNhvQ6KTktCriJrRRXDmct8fdL09TkTmidol6KJEUa09wGi-LPh51F9G3jNhGah_y_E3RBLBTiNPstb7tA2C9LUbc_LDyDnXNPYJbAtzfTMUnw';

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
