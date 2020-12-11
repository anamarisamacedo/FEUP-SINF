var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc2OTY2MzIsImV4cCI6MTYwNzcxMTAzMiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.KqT74SJ9nC45D9G9W-knz6sTUtjSDvMmIW3Rf15F87kX0MpDXcFtijsGCxGBDqTq8ou_8Qt8LALtTC9dqFD07hzwNI9qZ6j8BqeaMDnwUvQolz9jqPreCpBiwrS1206AS9q7D3P1hGUY5hfSbZjQPsisTanRRHpt6O-2jfhXOD5qFSpOG0xAz8SiQCT9Hsc9gWtc0zATP9D4qO0G7WigoUSL_oPCwBGil_84gZanKHk7B52-xt19rm7c5RB9hdBH_VVg2wEc8KoxZRWuDD7wek2WcV5aB5lYHmen331fKucnicyyLXVz20QzVlD9VplS49xl2dNbiGNOjcpEqnxv1g';

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
