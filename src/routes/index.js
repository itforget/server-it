const express = require("express");
const user = require("../routes/userRoutes")

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Welcome!"));
  
    app.use(express.json(), user);
  };

module.exports = routes