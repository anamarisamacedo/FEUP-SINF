var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc0NTMzODgsImV4cCI6MTYwNzQ2Nzc4OCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.hKFeInrI9LDzUgpVLh1T9N_2HFrZpF2Hg5Sd6xVzyrTK1mAo6bLOVBWvd34lFUfTFx-g-DK1ZeIo7Nxja5s3YdS2SmkmkUDpnhnyWxB_NtFCP9mR6ekuPsiKXGwrzZFA0sxhha8Baz3YlOk2v9yxgvQt01E76OSX-9pTxdXuyf2n-hLI7lRNPc8lrBKn9VJxWLG8ft9-0CmpxD7cKxGz9K5RE1tDNHCd6dMsf1RoH9eq1_C1Guq7gsBrGcxZYXeTu-N0vMmQcHvEVmcxIoTamoVIDNqvDHy6JNXGIUw8EPHls4FtlDGiFxQES3iRwPPmTmvyNVEoMyT0Jj3qXcJgJw';

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
