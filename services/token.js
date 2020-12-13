var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc4NzMwOTcsImV4cCI6MTYwNzg4NzQ5NywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.erSukhcNfFSsTcl0QuF1td9tr5WZDtY9TOU6scPwmCTEGGkbG8tIQp-g9cHmJvuNO2CgQwk_B2xX-pESC_iTvxwxP9w49CmXmyzG0HJlihqKEc-9kCqfax_6M1aKJ8wgmp_FvoqgJrxvmfy2Nno7QRnIZ9rRQatpzSYVjEMUoRL1YMkeMow0UXJdk25SZH5hdMja4VY_twT9hi9Z-q5clV3BAo7KyCH0muvNapVYqfGrmdIBwG1tqLy7jtBrS2s90ZhXWzFr7klFf_PsgIKX6W_2R8KslXL754QpZ2dwPyu4kSXCl2b7Dcgz4hL7gNn7wbinIPLQWdxgEtB36CXJqA';

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
