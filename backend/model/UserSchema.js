const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  passwd: { type: String, required: true },
});
const UserModel = mongoose.model("UserModel", userSchema);

const todoSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: UserModel },
  title: { type: String },
});
const TodoModel = mongoose.model("TodoModel", todoSchema);

module.exports = { UserModel, TodoModel };
