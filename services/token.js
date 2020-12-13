var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc4NTIxMTUsImV4cCI6MTYwNzg2NjUxNSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.EkWOleHmWXylD-F2T7BZutQhWJdAU6H1KlYE7zdcFH_dz4cQ1HBZAg9QdJmPEM83Q5HKIzqjped1cfnPejJQVTx0b1aoJpGgeCoLipDzfExX7IDJhAumEIcHf0ALYAmpvvOh2WCnakHntPvxUFocdm8QORAVSc6BuIX7Naqt3MRRkOe9FBZEOfIC2t4bZH8pNO6cs7mlR9macx2foEe0vtGppRHObITemiy3pr3GGL7yRSN5Bv8DJKkSIhkHf1fBhrty13HK_CBFSzFF8YvuPGFLyVIz_wATfMrgFMidncUY8tPyVIkaGtRKwUz-R-yjUMJIc7L2Rdc_KFiFaDfWbw';

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
