var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc2MTQ3NjksImV4cCI6MTYwNzYyOTE2OSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.GJQr9z9DMeZjWDk43US_-wj2SOgWxtdy5zcgcfC7EC-xKrnFrZP0QrMFOKii48G8jGA7gAOZzHGL8x2zoPDpUyDy-jL5q4q1Rwynd8GZEODyqJsEY4q1TZoZZLJ82OuX0bfS4p9LcqPTAiCAy0iy2ESw9QGFxchsOarAS2vUYCaQYp5_yreJU2eaWraI-ohN0ERPyoAwwHHAap2tYNAudQF5krv7kJ8Os0E-9Sh1i0omkNFoTvBfdhVy3gIqFo7uWqiKSenWujIxDCARA6ZqHk8e59qqju3Ri50iSltz5aHutl8GXHXYxNTTLIN81VpZNpwxOqXOO0uBO5eglR3zDQ'
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
