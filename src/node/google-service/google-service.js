const express = require("express");
var google = require("googleapis");
var OAuth2 = google.auth.OAuth2;

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export default function({ app, User, config }) {
  //client ID and secret
  let clientId = config.get("auth.google.clientId");
  let clientSecret = config.get("auth.google.clientSecret");
  let callbackURL = config.get("auth.google.callbackURL");

  var oauth2Client = new OAuth2(clientId, clientSecret, callbackURL);

  var drive = google.drive({
    version: "v2",
    auth: oauth2Client
  });

  // // route middleware to verify a token
  apiRoutes.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    // decode token
    if (token || req.method === "OPTIONS") {
      next();
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: "No token provided."
      });
    }
  });

  apiRoutes.get("/", function(req, res) {
    res.send("Hello! Passport service is working");
  });

  apiRoutes.get("/error", function(req, res) {
    res.status(401).send({ message: "Error Logging In!" });
  });

  apiRoutes.get("/auth", function(req, res) {
    // generate a url that asks permissions for Google+ and Google Calendar scopes
    const scopes = [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.appdata",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.metadata",
      "https://www.googleapis.com/auth/drive.metadata.readonly",
      "https://www.googleapis.com/auth/drive.photos.readonly",
      "https://www.googleapis.com/auth/drive.readonly"
    ];
    var url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",

      // If you only need one scope you can pass it as a string
      scope: scopes

      // Optional property that passes state parameters to redirect URI
      // state: 'foo'
    });
    res.redirect(url);
  });

  apiRoutes.post("/file/list", function(req, res) {
    const params = {
      // pageSize: 3,
      // alt: 'media',
      q:
        "'0B9tPYCpuqoIrflBJN01SZEFFcUJLS3FkYTktbXVPOUwyZFh6OGZRSmRnWXFYNGUxQk9iRzA' in parents and title contains '.mup'"
    };
    // Retrieve tokens via token exchange explained above or set them:
    if (req.body.token && req.body.refresh_token) {
      oauth2Client.setCredentials({
        access_token: req.body.token,
        refresh_token: req.body.refresh_token
      });
    }
    var retrievePageOfFiles = function(request, result, nextPageToken, callback) {
      request
        .then(function(resp) {
          result = result.concat(resp.data.items);
          var nextPageToken = resp.nextPageToken;
          if (nextPageToken) {
            request = getFiles(nextPageToken);
            retrievePageOfFiles(request,result, nextPageToken, callback);
          } else {
            callback(result);
          }
        })
        .catch(err => {
          res.status(500).send(err);
        });
    };
    function getFiles(nextPageToken) {
      if(nextPageToken){
        params.nextPageToken = nextPageToken;
      }
      return new Promise((resolve, reject) => {
        drive.files.list(params, (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      });
    }
    var request = getFiles();
    retrievePageOfFiles(request,[], null, results => {
      res.send(results);
    });
  });

  apiRoutes.get("/auth/callback", (req, res) => {
    oauth2Client.getToken(req.query.code, function(err, tokens) {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      if (!err) {
        let redirectUrl = `http://localhost:8080?access_token=${
          tokens.access_token
        }&refresh_token=${tokens.refresh_token}`;
        return res.redirect(redirectUrl);
      } else {
        return res.send(err);
      }
    });
  });

  return apiRoutes;
}
