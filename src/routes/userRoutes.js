const express = require('express')
const UserController = require('../controllers/user')


const routes = express.Router();

routes.get('/users', UserController.listUsers)
routes.get('/users/:id', UserController.listUserById)
routes.post('/users', UserController.addUser)
routes.put('/users/:id', UserController.updateUser)
routes.delete('/users/:id', UserController.deleteUser)

module.exports = routes
