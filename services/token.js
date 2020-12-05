var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDcyMTA1NTgsImV4cCI6MTYwNzIyNDk1OCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.H5byaAduAq8cDB3BNScD7G5IYsR7QN4b5s3rjGRnnBJTzHI9NbsRMvzZPu7FkxIFQI0AeM3m_t2Mm_Mptdl0_0SsKHBtSfp1yzJdUG0VEgyjPxhpTH2JDAaluI_c664M4kW5Sncl6OSVSsHe9zBJ08adeea4G4p_fbmpGFmIZLgfWyuUtiFBMBc0qizUDDJRErHKYw7KZj-stY58dV1oWp13LPu1be9QPIu4KD2ofqa34z4RcNRNOd7SpLNLjFK13D4TelCPba5Y0a24jyazMY72mz6u5VfbjXm1CptrEx5KTwORC43iCsVAZyJYzXmhWGra5ByjWIg-J09wt4no3Q';

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
