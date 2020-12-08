var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc0MzM4NDgsImV4cCI6MTYwNzQ0ODI0OCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.MwRYEUmlqyI7vV-1UxhiA0I3vBWsa8m2Z2BvFG4nMCvM27tD8jvRrlqd1-fXAMKrkGz2u5gpn144eJ77EVpL2cfKAsRHFbH4Hpx96eyt2582uxMNojQYPhDceLnOXc1Qu9NPSqzewDJY4jhBxwCoz-kxjvoxc1-ZWJ__ngodU2Pb3dpmdNLue4-iwZ9hePga7v2mBp3AsVvd18Fg3RV86hHeuRavNNPXhSaU-S0CVfZn69ufxX8bdQ754Y_4HAKALbUf24R5DtJ6sFCi28fe8zMvzKyIwDUvR39HJzwl0pnmbUg64BAvikDk89zWuQb01DNQDMx2eSKl2cceCom4VQ';

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
