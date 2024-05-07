const User = require("../models/user");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/token")

class AuthController {
  static async authUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).send({ error: "User not found" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ error: "Invalid password" });

    user.password = undefined

    res.send({ 
      user, 
      token: generateToken({ id: user.id }) 
    });
  }
}

module.exports = AuthController;
