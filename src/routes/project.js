const express = require('express');
const ProjectsController = require('../controllers/projects');
const authMiddleware = require("../middlewares/auth");

const routes = express.Router();
routes.use(authMiddleware);

routes.get('/projects', ProjectsController.ok)

module.exports = routes