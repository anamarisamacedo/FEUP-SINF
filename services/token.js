var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc5NTU3OTMsImV4cCI6MTYwNzk3MDE5MywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.NP0QW_f90dLpWiPyBwpN4qEmL9veDgHsatdFYefNf5LmzSJxvoFas6aLnwbsSpvUQJDtcOvvlV9Q4r0-2ykJfIjsDjC08h8mJZEiy9FnLSbcj15cpoUAKQjHU_hmM_YleQVO_iZ6gJ5wAfk2P6Chwrr5tuINwhO5N74NKlfsPLZBqeADwvNPHdolSHq3d8996zBkk9E6UsXMmBahgnB4J91GgCXDPahGpTnyWvWg3rHxbAwlPxIzEpMKE4-kz_e94nIEFFrzXW2BYs8nv3zgg3HO238JSBmX2QJDEKUgRtBLNnWmASRYT6DsMN8wQD82KgOQuoGLGhmy7c4_AWc_Dg';

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
