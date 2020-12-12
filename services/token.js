var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc3NjgwNjYsImV4cCI6MTYwNzc4MjQ2NiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.QoqS8k9yyJNGZpeuW8PDnYhgRT39y8K080e_O2pHQgFSxhGMyYYNw-SqGeNh9BYM_J3KwYk4ItZBEe951CA45W_ZE5psrZdjJAJPKdEHQWuALZIYVAp4pI6FWOFnkI0NjzAvoExRhfdTcjm_Ex-C18x2Rtt9eJ4rQgSOoRo5ALpBW5N-v6sHB4AkH4RrGwTlkviXTuXaWN4sDfq9kgb9Jt36Com5fMfqkr292uXB_iKU2lIBcvy3pN8ubC2WIoqe3_ZorBT1U_lXxO_jWn_Ezpgxl1MH3Byc9T83y77oCQ0kIUHc86ZED9FfSby7Bwc4rldHqkFRTJnwardKMK9Sfg';

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
