var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc5NjE4NTMsImV4cCI6MTYwNzk3NjI1MywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.fM-4vQZS7FSj4qeBSP-zDd4nHc2xcnenMujw-7AIMOC25qwitrv4ZQ4PZDvBmGfRP2eLnXQ7bDnBLPncSJa_4ykQbJhl0NFN96GouN934caN8N1MQZf6XDFfp7A0Xte0GDhyuG_YhjxfZOTIq4eIc_fVXrzdo1KgwzksTfbS4T-Obe2lE2dUdy5IDjmB0QaVYYAS7MF5Rs6myedMNr73TvjsyvX9mWyN5BRLaUbQJCAvsG4J2H5_byxrooG2D0v9Jz4AwST23K_3bgqkAGagbS5_ReSxgX-G7Qjo3hOzPTG1-H792PN65QCjk2IHc94h1D8DdDdYML69z-YxNDRt2g';

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
