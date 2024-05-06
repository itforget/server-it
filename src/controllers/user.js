const user = require('../models/user');
const bcrypt = require('bcrypt');
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = await user.create({
        ...req.body,
        password: hashedPassword,
      });
      res.status(201).json({ message: "New user created", newUser });
      alert("New user created");
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
