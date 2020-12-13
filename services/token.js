var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc4MTkyMzIsImV4cCI6MTYwNzgzMzYzMiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.JyUmoRB08aD7puZvwYqLmjrhGM5ZDFdEDB2P2B2PoSnKolwx7dwOVohAZXUKTyRXN20aTxDC1oOvgkyYv1E1xyp-6snUK3Gu-XKZA0Q-0VF2PxJ6ZMILKmIU3jofwIuxMfc5josZiW5gQZXKkue8t3CLZZ28NLrIK2vnk_tcJqMEDy-DbWAjZ9VzKtXjP6jSjRJzhQVvuQF7-nfypA7TcLgHw65eRZS-MxltqZfRoXkhs9_xUl0qqN2TMJlXJrsENswiBKBUFIkvIMlEoSxszFrmpcm6s58cyhzdTSRkGF3f7vWRu7gbItiL3ili02g82gyrii-LTxJfa-ARhiDR6g';

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
