// basic route (http://localhost:8080)
const express = require("express");

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export default function auth({ app, Idea }) {
  apiRoutes.get("/", function(req, res) {
    res.send("Hello! Hello service is working");
  });
  apiRoutes.get("/populate-db", function(req, res) {
  });
  return apiRoutes;
}
