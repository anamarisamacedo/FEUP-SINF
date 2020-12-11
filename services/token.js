var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc2NDE3NjUsImV4cCI6MTYwNzY1NjE2NSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.A7A3uCu95lgckRVn04SEstHkBMxOm_QG6ONBMWYbJau1hF4A4VfIYHTduZhYiIQovarKTw74ubTaDnUi7KAlLRz-_KQPPMWMPvHZmA6s8ear7rNejpB8MvfVkNazbLPQpHBTUCFgSy0F0XgS8F8bu7bESDwptVJ3lAuTeUA9gp9sbEG3qwnaNj0rjnmgVhUA5XgjCK3B-OOGiAdX79BeeBnPxoGhyfgaif8Bg8OqqG59gBhlavmfaVaVkydl0nLoLEQQjMHKzGPcO3QZ4-iZUPOGkzufZnHASDVb01ps9TqvUqcdG83o0LxZZ7ZN-lp0MdcCXlCDC5vxImahLbgCLA';

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
