// basic route (http://localhost:8080)
const express = require('express');
import passport from 'passport';
import googlePassport from './strategies/google.js';

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export
default

function({
  app,
  User,
  config
}) {

  app.use(passport.initialize());

  //client ID and secret
  let clientId = config.get("auth.google.clientId");
  let clientSecret = config.get("auth.google.clientSecret");
  let callbackURL = config.get("auth.google.callbackURL");

  googlePassport({
    passport,
    User,
    clientId,
    clientSecret,
    callbackURL
  });

  apiRoutes.get('/', function(req, res) {
    res.send('Hello! Passport service is working');
  });

  apiRoutes.get('/error',function(req,res){
    console.log("RESPONSE >>>>>>>>");
    res.send("ERROR");
  })

  apiRoutes.get('/success',function(req,res){
    console.log("Success >>>>>>>>");
    res.send("Success");
  })

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/success');
    });
  return apiRoutes;
}
