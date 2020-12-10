var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc2MTcwNTEsImV4cCI6MTYwNzYzMTQ1MSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.rbQLBdEULPnuIXKVMYGX70OsQAMO6Y8vbBlN0I_jo-NCcx1azdK1EbaKfSnlLxD9yF5NSANsrhR5Abrpuw0VAR3xc9-z_otfmUENG5N4veGCqbfQWrWJ0YvAu8fLbopetf2Shf-T2j7frqGNPZUF2LG3ylTiJGT8ryelnBAsNU7eHELDoKrfTV9A6ZBJXUzTnW2OzG3vqHX7wjI4mrPrKelvpKAs1UPF6jSM5w7Ulv-qWvvNZBk8OJW50LhHIZZ8xFU1MDzhhTL2aNLaFS25Riv3RASTZgHUSKMl4szddOl1rOSObUTLyq8KsG23GtyiN6cBC0HBJ8QMTEs4ZY3CHw';

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
