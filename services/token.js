var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc4ODgwNjgsImV4cCI6MTYwNzkwMjQ2OCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.dQwuVylS2Xz13phIYPHE3h3ujp_uKnHZdXR-uWdqrrD3LdRvBpyz3hYYaCNhFcIjIHB88vVB1-vqZRXHDoWH6TpH2zQIDDEr-emEcZ8mNQQYm6vZ2-WspHgRjbMcY_Sapk6qTvrQKfE0dpGXL7MxY-aS_7T2PMXrxildz5gUAm6f2YwulCJ-8WY8n2FUkTRLKG3Cx88EGS-2jj4Egi2zh_fnh01WUvPnKJyeVA5yq7hasamhLBIYvZ1mrNnZ_Jv1DcFHmgHfTqu9xnvQotYx0xpZ2HnXjAcsqD_1iAOaRC8oNbyF0x5e5rvFSwOZMEMH56mm4b_QiBfYAI0BsFI99g';

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
