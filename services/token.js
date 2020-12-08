var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc0MzE4NTgsImV4cCI6MTYwNzQ0NjI1OCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.XAo8K2Q8K-8BMigY0F0H2F9MGgRgnDTQFloqE6DZjyFFp6pCOHccep2bAQuh7iqBhl5dEy5ZV5J5Z6VsRqGGIcarEchEmVw5CUdbYjFk1FCA6s4RHuLEDDmmCw6Yu8RYX49IzaEATfuzSrLBdFMfWJAAtk91YqzxXV3KI5udm_QV3o8YAKRLMzmG1m6i7-lTeIvrgNUkrpjBCv4DkK5khVlnBPJYcRoF-MeVidHUertblctD4W8R5ZNSaseo5wjQfI2v6D0qankiicsdKvsNsjXWI8639GzO1zJ4awm2E3jVwCYZk6ROaPQ5pgxa-psejt2p0rak4HGilNoAnvyO7g';

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
