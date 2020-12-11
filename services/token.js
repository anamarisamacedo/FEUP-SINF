var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc3MTg4NDksImV4cCI6MTYwNzczMzI0OSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.1z3SF5xWy9F_KzB83CxrMZ8FVBoomvh2cq3OTGeL1rikW6I01Wxcpf47cl1p04oT3HCN6vx1ePjVS6NNtCDUppSDDpDDKZXsi4tHWUmU3Ti0zfCEnagmF2uoLb301Y2Uec8vOoQQ3pGNDttMkj38SF9LFwV4lknJgYLA3jVMtWPv2LQk8oV7nsxLUeYVM-9WYi_F73CK0PmXXAK64LlOfJxVt9EKWT8gmVzBd5KQ3uU2UEcdEUMGwPJbSUHu_5DQ9dB4JjUdtlgNnKDJc3SO0PmgY7yiuvepYiuVUVrElW4LrXRk5vkT-pje_bv1tW-Em0hH-dbuwmkDrEQ4e0BuUA';

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
