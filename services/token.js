var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc0NjkyMzQsImV4cCI6MTYwNzQ4MzYzNCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.hblK-kF01FB-0rEQHv3aOpTi_JQmb6BP17eDqe6tYdU_ujO3xObmYkAGjhOhmjbMjmTz9AB40jdFSHOkDePoeDCcXEDvGMt7YTkUPfPu7x6nFBA-U-Y976q4YXFDGuD_iIMZLZCMsseU9l4AW7Uy31XzZjgOVQ1cGON-wE4fOjaFsfN3uTCGlRfYEVfcVCZrbu2HzVDU5xrGTLqhy5ctn-fNtULVwFf1x2g9mX8EfcoirS9tEnLruBdD6yxwCKFvI-KBx1AOP53pdXFWgd28oUa98QsdqjMqyCom_MM3s3ubc9PMFGeFl9xZZdqQlfv9O9y_A3B89pmzh9Nl_eLzCQ';

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
