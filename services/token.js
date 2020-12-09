var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc1MTI3NDQsImV4cCI6MTYwNzUyNzE0NCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.LNzyVyJ3YADdGIPDBAjViZAYcETjr-DJayAn00zfD8OEVaDy5eGvwexa7fm6_qusW1RSX_YSMZ0DUoed-e_hB6GnnLBChJ1-CgtWZ69b5_B6oYAS0o2paMtzQfTiz2a7rWqz459GWL-zBFM8lgfh2XRzlyBlMRY_qzsD-mjef-8Y-VYhjDQSLYdhX4_DrjumGqGsOeCL2OUIr64_RWuanBr1bU0VslzXQ-Cv2sY3a8x9lAigJ0AKT-XKKR9F0ecmUEcI01XJjn9rSrf7HDP2cbDwxYuE1wzKvtW0DDzz2NM90k4_4cAiqzXd1paNtNd-xtSs05Z6F-yCt7sSrOy-hQ';

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
