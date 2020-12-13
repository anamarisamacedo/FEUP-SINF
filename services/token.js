var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc4NzczMTgsImV4cCI6MTYwNzg5MTcxOCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.JFgQ6c9S3Zjk5uugtieBR_aPKyh5rRAFfuyNsq8bSo6Im9w2RP2pEQ_5hXo6Pefd_ieZn0IED0PT91vNsQxYU1zg-4EPf5iyKX635VWA9EjiXAL1FVk2TxmcIr4lkRkydyEdeHcky95Lprc3SoX9qqUlzupyP1pHJO6Uoz5GBkBEAa6arUEO3_DH-hVnmJVvDKNq0CpojYWB5iY2HKw2tAbqYBK5nBL_wBsjfWmIzwVWv9FoYFFfxsF96mefq62ZymxlEsxHNEK4tgKd1eqvb8Mo_5fAm_79_s03Pwg8ynqCrlB9blqhAQkp3ZJY0bz9PZT7dDWu31zbHFfngXzsOQ';

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
