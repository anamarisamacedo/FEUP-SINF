var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc3NzA4MDUsImV4cCI6MTYwNzc4NTIwNSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.daDHECiPjzkjy8D-L1SxHxujJ60GnBlBhhRS6bKgTqZJLhGNazNRb4Ml4YuZ5kDmfZ4l3yMHWodKxNf7HSK-y-l_l0GyKC3MwZBW3fi_Eptgt18_n77A5HWqr6x1ymabkZIVMjDw1eWav_EWU7JyrjZ4KTdEVnQ3lgyRDc1zxC70CkJvuo4POLxuzBsivyAZ0j3Hw4meGYuVKme7VgjNopzn-4aZeT0CZ8aQFWcFiGgRPnBNmrHvnVPZVJRZughBIeGpIGDQoolHHj7q8HZSLYo2gs1tH77BGF4QHvUEvJcDNEcBcilIl6xTxQz0QIwPC6XE5YcqvDMld0K-iqntUg';

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
