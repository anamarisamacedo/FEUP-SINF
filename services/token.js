var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc4NTgzOTMsImV4cCI6MTYwNzg3Mjc5MywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.XKg8U2XVWTdd2KWioOOXpivhTEXf23g6D-B4yfWp9WDOdGyUK0G_dDm3Tj9MRx5-CnFgj03PcsxuOngVkx90hP5Qwj6XSwW4DNpCHN7BgoUgc6BYWMIlcbBDwh_QbIFeDCm5MaxWccrZrNV7u37JcRO68ORhy_ODiQffnNbm6Vq8ec2C5EEBUsAAksZjbbhvY4mN4ImLhxGP7jOI81wyVUTZiyissVFXiRxB1cAd0ntwlTZB6VfS04U1G5ipGEqVRocgkRLKj3Z3ItqVqvLSS0T0DI198Pb_hGQ6iJYsAgwbsvRydLx0t9CBA0EUU2H0i3RiSzQr58nmI8U0CFCb_g';

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
