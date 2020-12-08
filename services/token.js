var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc0NDYzMTIsImV4cCI6MTYwNzQ2MDcxMiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.NTKUX5-BZdHvUo7V7dHnDafnY-peJkGFolDARhFOKADaDH3PxrSwQND2pUEJ9TjU4pEXyexnuD81wxN2KsH3sCAplHGNAfanumVw9WfU36rqU-uH9DsyL5NXt1Vdj2rk5zAt81QuYF3LMWfwTqPE2Sb8B9j58J7rgWs1lnVcEp9HGH_hQkWqVD3r_Q-acQJAI-F0YS_iooAAwOMO4h-dfxhnB6QbPdgjv5vUj_a08l72g1YZE28XFL9d7QUEypgF-dWBv87ed5LnLuUKkwqJ-pGIRuuRCksqqSfKd52dSZiWmtiPnTpBo0OcoozbkJPqZ8FMx9MEFgrBXbUWQg-t7g';

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
