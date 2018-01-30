const express = require('express');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export
  default
  function ({
  app,
    User,
    config
}) {

  //client ID and secret
  let clientId = config.get("auth.google.clientId");
  let clientSecret = config.get("auth.google.clientSecret");
  let callbackURL = config.get("auth.google.callbackURL");

  var oauth2Client = new OAuth2(
    clientId,
    clientSecret,
    callbackURL
  );

  var drive = google.drive({
    version: 'v2',
    auth: oauth2Client
  });

  apiRoutes.get('/', function (req, res) {
    res.send('Hello! Passport service is working');
  });

  apiRoutes.get('/error', function (req, res) {
    res.status(401).send({ message: "Error Logging In!" });
  });

  apiRoutes.get('/auth', function (req, res) {
    // generate a url that asks permissions for Google+ and Google Calendar scopes
    var scopes = [
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/drive'
    ];
    var url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',

      // If you only need one scope you can pass it as a string
      scope: scopes,

      // Optional property that passes state parameters to redirect URI
      // state: 'foo'
    })
    res.redirect(url);
  })

  apiRoutes.get('/file/list',function(req,res){
    const params = { pageSize: 3 };
    drive.files.list(params, (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.send(result.files);
    });
  })

  apiRoutes.get('/auth/callback',
    (req, res) => {
      oauth2Client.getToken(req.query.code, function (err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (!err) {
          oauth2Client.setCredentials(tokens);
          return res.send(tokens);
        }
        return res.send(err);

      });
    });

  return apiRoutes;
}
