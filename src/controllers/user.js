const user = require('../models/user');
const { generateToken } = require('../utils/token');

class UserController {
  static async listUsers(req, res) {
    try {
      const listUsers = await user.find({});
      res.status(200).json(listUsers);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - failed to list users` });
    }
  }

  static async listUserById (req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await user.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - failed to list user` });
    }
  };

  static async addUser(req, res) {
    try {
      const emailExists = await user.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const newUser = await user.create(req.body);
      res.status(201).json({ message: "New user created", newUser, token: generateToken({ id: user.id })  });
      alert("New user created");
      user.password = undefined
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Failed to create new user` });
    }
  }

  static async updateUser (req, res) {
    try {
      const id = req.params.id;
      await user.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "user update" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Failed to update user` });
    }
  }
  
  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await user.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to delete user` });
    }
  }

};


module.exports = UserController;
