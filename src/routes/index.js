const express = require("express");
const user = require("../routes/userRoutes")
const auth = require("../routes/auth")
const projects = require("../routes/project")

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Welcome!"));
  
    app.use(express.json(), user, auth, projects);
  };

module.exports = routes