var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDcyODY2NjgsImV4cCI6MTYwNzMwMTA2OCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.UGFGiV97LWlAFfjoeMxxSRUN1k10RK6jSNc0WTTDNb8WUn8zyIMaQMnwiS8p1HIVes6jQihifTbgKzbISDp0aRlJR26q23rDL3iQGuLD66y9_3wQLs5ZB3S9LcwUEVHqioE1toI045xxFnUb5FqMCqXo7FOynX16C2e7mF1DMQKGRJXuE-at-LQmpaNsrw2EHFXO0eQoJsEk_4FMQxLxJ19jxG9mAFRMlZhgMcbW-z9QLgOQ1VndknGhglpvg-XbZvBhXYvXFmSTqFx5vRqBSF1iyMz_XYiz6xPrtIfRH27XCL-P2rkasDlV6vI2e-TIaIZZaPLiK5RswkONP2OKoA';

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
