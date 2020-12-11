var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc2OTE5MjgsImV4cCI6MTYwNzcwNjMyOCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.WTghwVC-lhWlGCuhdTzXRdy8IwIQNWQJqN8kfWDzdbu5Jo9oDTa5jNsGjbQdmtNa5XDTllCITPdrjsNMZU6K9h4X-qELFalKz6pRAiOtvRETkpMqHds30JCnpB8nwjEaInsWn9Mh5cg3QWoj4sF4MWPuxXqAhPsgbUsh4OUx1yEgpGMsUgQM_S9ePV4rheEGIGood-B7pEsTV1PvBu3E9wSnQ6uSocJfLZFFJxafMQrkJLKHDDk7w7xRZKg88taNyNB7qaOltJH5rB1pZV41ORTBAUSMN2nfNw0xC7q9k7ZnB6St_IETc9k9BguqNoV2KnnRkqsR3r78mCDIONLeQQ';

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
