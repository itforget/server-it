require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User")

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
    res.status(200).json({msg: "Hello World"})
});

app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id
  if (!id) {
    return res.status(422).json({error: "Please provide all the required fields"});
  };
  const user = await User.findById(id, '-password');
  if (!user) {
    return res.status(404).json({error: "User not found"})
  }
  res.status(200).json({user});
})

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({error: "Unauthorized"})
  }

  try {
    const secret = process.env.SECRET

    jwt.verify(token, secret)

    next()
  } catch (error) {
    res.status(400).json({error: "Invalid token"})
  }
}
app.post("/auth/register", async (req, res) => {
  const {name, email, password, confirmpassword} = req.body;

  if (!name ||!email ||!password ||!confirmpassword) {
    return res.status(422).json({error: "Please provide all the required fields"})
  }
  if (password!== confirmpassword) {
    return res.status(422).json({error: "Passwords do not match"})
  }

  const verifyEmail = await User.findOne({email})
  if (verifyEmail) {
    return res.status(422).json({error: "Email already exists"})
  }

  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({
    name,
    email,
    password: passwordHash,
  })

  try {
    await user.save()
    res.status(201).json({msg: "User created successfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error.message})
  }
})

app.post("/auth/login", async (req, res) => {
  const {email, password} = req.body;

  if (!email ||!password) {
    return res.status(422).json({error: "Please provide all the required fields"})
  }

  const user = await User.findOne({email: email})
  if (!user) {
    return res.status(404).json({error: "User not found"})
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(422).json({error: "Invalid password"})
  }

  try {

    const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: "1h"})
    res.status(200).json({msg: "User logged in successfully", token})
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error.message})
  }
})

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.log(err);
})