var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc0MjYwMjIsImV4cCI6MTYwNzQ0MDQyMiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.pErPKJkxY5fUOxztUk1k17fXqQA2XNXQ2m-AfCC9n__CzpTCVMxm8lQNFRCrVpNBx_LyBB4iS19o4kmoedb4WufP2Dhg-fuc4rJDu_OzNntPi2L-hvwaGm9piRu8ITL_ub0wAlGSef7e3xXYXwJlgY4NIDLZm0U63ziby-UKmSUqmjrGgR80VZ8iJ6JZQZn63XEphesQXTbXfKlhtgpKdg2Se6aEfcLTUSZ0W03noZCAVasTMBM_p6kBkLV3hgDJ_KvJUCN_xpWGD4yjg4LRK1HM_ri-NI8oIdozMD0IbaWjwM2TGHFMwjgNm8bhnLzMD7CASJLHEJ0_cGSkFlaNRQ';

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
