const express = require('express')
const AuthController = require('../controllers/auth')

const routes = express.Router();

routes.post('/auth', AuthController.authUser)

module.exports = routes
