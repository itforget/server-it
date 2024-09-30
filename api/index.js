require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("../models/User");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

app.post("/users", async (req, res) => {
  const { nome, matricula, orgaoExterno } = req.body;
  const user = await User.create({ nome, matricula, orgaoExterno });
  res.status(200).json({ user });
});

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors({ origin: "*" }));
