var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDcwOTQ1MjMsImV4cCI6MTYwNzEwODkyMywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.2d78-FiD3so4G3ogCkq1BRiziWqETanMFRRKUQGb4X_-2lC04Ac_zm4kR8PwZaJg0QY2ShvBEQhP_6ZAdY12X1p5D5v_zq-pvTn9t-i5SfRQN1FfdpKrZbRDqLO4LHaEiVl7KlfUk375MJW_U-ffGseGIDMEsH5Ns9jEP_al5yvhehXskISs0-_JqUF-mMB3qys2yl1mFovvnZnpw5IvOf5vecn4VAO4_VUdHKW1Ln67Cx_7aTcdwZo7PXtiCSumHeobvaGeF7G_f1QwIVbPRvvHcPxnqrk7DXAd15T7P6UrSpZLVKqd89gItYPHuyX5HOHxfxJ4QhM7TCRqjKwgUw';

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
