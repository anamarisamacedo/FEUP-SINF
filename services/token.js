var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDczNTk4ODYsImV4cCI6MTYwNzM3NDI4NiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.lca58_Gy1VzPDHcjvcPnI1RufNj6Jj48XMAc9-n8yXVbzKkTQ17MwqxIIeJ07UWGKKAdRcdHLHmV6ZM0yrD4zBA-wdkT0CjMsJYNdww2s6VDg3-VhDIQ9JT185ajyOT2ExGlkNZEDcqMn9S52PofGpmogGoXQ-BSvV85tgMDmJEVmAMHQiKL_zlNN59rAYN2RS5s5OAS9kJTH0hGfey3a3Axfgybn4C-XpLqw-cj_w0MW6B3pFVifAdApj712ufRk-e9n41ZQnnIyhqYgC2ET0hlwwnmaQvqG1hsH_IZSmmdqlqu8uIYB7rt-an0nOdPmvt7hV_lXisIE1yiwwmR1Q';

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
