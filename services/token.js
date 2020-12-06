var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDcyNTM3MTYsImV4cCI6MTYwNzI2ODExNiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.PNAYp0Dk4tkM76d_yaGsWeJFqLc5La7DW854VY9pCBo8-wVqL3Vc5xfTtiOsgyx9rOZN2wSs1aiUbU549AtDhu8nS40nAMVkvKEn9G4LW6rpVh4N58eyER_iym4f6boLwhBT708nof3frUm7Ph120IkHuWhwRnbkqWwumPfKwowelLIkNj0V8QkVU8aeVCmmugfyXOGtd4NG7untBFzVmXIpuquExJAgVnOGIg1P4lcqnw-7Fj0k5DB6wiAiZT_tp3kGpz5PuPSjzy-kOiQZFcWo_jZGGjU7olI5lbRafXoOsj5dZzK492n8Mtbl1PdOm6VtAFcmeOuIyMufFUAKwg';

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
