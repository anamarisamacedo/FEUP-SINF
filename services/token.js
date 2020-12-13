var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc4OTQ2MjYsImV4cCI6MTYwNzkwOTAyNiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.qdlOGBDNDHB0KBCvki3wt5LONacLvJxPsmtx5zlJVhQLttEBk5CuV9dp0F_TBMIMYg6qgh8Vhqp7mjhwnkPruEDcld_ODoi_NDNgV1mTuh6yE1USGvu24WDR5LQFm9tMB_mxkLTm3dDWKHN6A-_LyB2yZSW3OCyCkqCrdCPlWvdbE1tbnaJAcna66Y1ttxvv-eOv90m2Nf69fVsUNFN3CR4Y0l9ZMlkbPykqJDCdHl7y_b1BcOO_cSzsWgPXRnxHmV7LXJjomCNyxxK_nqMEi6-UXBFZydF5aBD4m3MZOb0etImaKpDGQ2MNfqmN_MnsQ8NPoWCdRGQEmNLckS2f6w';

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
