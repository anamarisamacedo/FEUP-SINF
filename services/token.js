var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDczMzQ3MjIsImV4cCI6MTYwNzM0OTEyMiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.rxuJkzSsxBLpJICfWaay32E6xdBjtr_MRYKiuZotGnarmq48sJ-OWj2B7L5pbHRnYbPekk8BE4qK1Akq4rNYKHvv0MUMSApyeIkdhuNJbbeMmjHDrK9GHLateFwcF_nXLDCosNKYq5vth2hcY7gcg7tpwzTDrX8KfKFlaHkcqWRzl-z3n5CjkqEOnRl12x5fjAQKodovRt2XfQyESSJwB0mRjZcV7SSa0SjoQ6cHQOnLUBmG-y-sTWziltlZOZm_J641MVkgSn2NmtQTiRvndWVpmVIuxOE6Uds5xQ16S8uhictUymdy2eg1rBJx3XIGeIt6SNLUKbEpSZ3P4Gawsw';

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
