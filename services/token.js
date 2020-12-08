var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc0NDg2MzYsImV4cCI6MTYwNzQ2MzAzNiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.SXxnLz0YL5ZS7RmuSNaCB7fut1IEKcaurewsHWaTa2uT1EcwFonBYt2MeaRUU-Oji-qFfSWtJHbVGiTyWrxy1XHPRSsEfkQD7DoZJWmnshR_rftQCkU7rxaKCNFKUbf_XlW-EsAJGS7CvBs9hkGPOO-F_5usiPjRXFOiYWkZQc4IbQLjjfiQXv-39_mNKrvuJaCjIYVkUHN-MJMLF4RbxfXcIU5LKTsEWKL64de0RnYoYTVSz_rDuIKXYSFuU0eIiumMBUq5hX8D6gBbzc5yKdmnOrMg1fBRF9Y3GfolagtUjdEeBJTX7_LVktOdZVQuv71nkTTTClt-hwnkHYhIsA';

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
