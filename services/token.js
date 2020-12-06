var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDcyNjk5OTksImV4cCI6MTYwNzI4NDM5OSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.pamUqWeAQ82hnlHLF5xjhGLX-QGgX9ePm7FjGyKG689y8fCxIkKL67J885msCEelyjHEuLCAHJ7RckvLcpPkktYowoslJk1Kjy4W6p8LS0pItMJFbebac2be06ivXCQab_VSJbGSn1NNgMimdpJj9NSFiGrbRXTLAQJGY2yNjj8qZiy9QZO-4DKCkJ_3e4DW17A4Rd9Dk-BiVzxw6ozKrPQaHRaxrurmaYY88fiaorVE3Wmu8DcirrbPbHO00WmRxAHV49dstuKXADcfU5yEFMpLCmigMmLowaKkXpoH3NquEoSj-Weyho6qIx45Z8gre1kPIO-_sPJblbCXCznPyQ';

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
