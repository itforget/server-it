const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: String, required: true },
}, { versionKey: false });

userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

const user = mongoose.model("users", userSchema);

module.exports = user