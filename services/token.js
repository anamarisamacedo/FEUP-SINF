import React, { useState, useEffect } from "react";

var request = require("request");
const tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDc1Mjg4NzksImV4cCI6MTYwNzU0MzI3OSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.S5jPxmTRWEITvKfa8FMzuMN9KtALs4dyxsLoKXTOPVgXfwYa9CdfP3FSZijMzEHvOSTxKKQLe_zPadbelvWRs5NBmDNPIoloQ47eS_efX27NktYA8DfAZwMYtNYIkaeyH54pkgWLyuKWPOXISAuY0TzUpvnkOKPHtNElvJWc_EpZi9akTU7kVHg-iSZbJE9M_3CbCI06TgJVyzXCq_vbdGRB5RZLvrbc9feWp4SLZFlXmSp-uoX_xJ_nRvkRj4m0PQLLizhz9L0x97AFwxBccnI6IPi7E_vsImMBpw9oUQqGoH8jFaHUh-zj-jKIT98ZtiZHWvnIEA7hd25K7sJTPQ';
var finalToken = '';

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();

const token = {
  loginPrimavera(){

    // Automatically allow cross-origin requests
    app.use(cors({ origin: true }));

    app.post('https://identity.primaverabss.com/connect/token', (req, res) => {
      res.end("Received POST request!");  
    });

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);

    /*const options = {
      method: 'POST',
      url: 'https://identity.primaverabss.com/connect/token',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      formData: {
        client_id: 'SINF04YAPP',
        client_secret: 'e96765b7-7fc8-4770-8b6b-0e44cd172308',
        scope: 'application',
        grant_type: 'client_credentials',
      },
    };
  
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
  
      const jsonF = JSON.parse(response.body);
      finalToken = jsonF.access_token;
    });*/

    const [isLoading, setLoading] = useState(true);
    const [finalToken, setToken] = useState(['']);

    useEffect(() => {
      const apiUrl = 'https://identity.primaverabss.com/connect/token';
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        formData: {
          client_id: 'SINF04YAPP',
          client_secret: 'e96765b7-7fc8-4770-8b6b-0e44cd172308',
          scope: 'application',
          grant_type: 'client_credentials',
        }
        })
        .then((response) => {
          if (!response.ok) {
              // error processing
              throw 'Error';
          }
          return response.json()
      })
        .then((access_token) => {setToken(access_token)})
      .finally(setLoading(false));
    });
  },

  getToken() {
    return finalToken;
    
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
