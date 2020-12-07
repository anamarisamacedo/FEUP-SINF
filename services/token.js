var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDczNDI1NTAsImV4cCI6MTYwNzM1Njk1MCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.3QlGdj5ykWSJnNaR7Zoih_mT8FF6SqVRlOva69YT2o9sbaXI9TKaoaw8P3KpPIjbSv6BYQLwJ2RBS11QdcigLVtl2fpBZTvJkdGkYfWoFWSxCK6GipTIpbrBUlb4bZPYrsz3iwGk2zX0gMAJcOW7fwrVEdpG0MDexN2QRW0z8VtOQgtV2bp7Ey7ziPfBf1GBfk2gNm4QuVfIbar0YfsAILLwomg3ap-exD3daG_4a4b46aqK_JWN5Xnq9gbyei_ulx0PX2Y24CYQk5x2wjSF2zJi9eHFq0JuztLlWYwm9cvkoPynlTRZPlQCq2ynhy3I49gH7nROL_2NjBIfOXLiUA';

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
