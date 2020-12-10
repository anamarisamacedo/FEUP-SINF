var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc1NDYwNjIsImV4cCI6MTYwNzU2MDQ2MiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.6Bi_ZTJaHjMU0aG2NTqStwOgs0CUsbljrwar63Fm5IlZE0RKgJd-w5l3p2eRYmWKA0Z8kRnlIhLYrTok_ai6OregbdytpcoQ9j68vQIzrOj045Kwz3WMpDyNdIWyBuUaNXBaGGNaMQe-GCNcq470JpNK8wFfHGfVAroFuvXzWlsQmORFAlD6gAufqjKT0Df4goVIvt3PrV-1dmxIiBbUxcrUpQu-g-uztIEelPqalSdW6-FJ6-LyqnPA0Gn8VSJX7fca3mc-mJEfT2qT3LiVWTEBByznJHuC8-xrJ50M4ky3qE7_8wPH3tqGZeUfdcxZ7udF3gNcAP3BgjKi3ZzBaA';

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
