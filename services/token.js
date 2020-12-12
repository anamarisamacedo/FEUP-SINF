var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc4MTI2MzMsImV4cCI6MTYwNzgyNzAzMywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.wH7xVsQNoN50QcgfNsPoWfz3BvhsdOcM7SkkIesJ9fZIttlmC8Ysx0oay7P0Np1AmwT-x_wOH9Mcdn-N7xFtMl9JOhqEe9zD2ggyH-Bo17Mo-39LJX-eTnsmTtE74JC7uGp2yuCCbSJKhLputLKij1fJIU-XxmFQabEd1gVBojptsOaHDgz3z4Anl92fyklcCwQ3vPsVRDBuVTWUpCjBHQntMsq5HJvxirKFa-vlIM70gsHy_pMBFREfMyawTRa3QVdu7FW3_TMIGfWxG8uTpY5FqEtL6_tQDc5g2xnj7jdyOJGrvDRn4aJxX7p0Y28hxIfVfPcH97KKFsisK6iGVw';

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
