const express = require("express");

const { UserModel, TodoModel } = require("./../model/UserSchema");
const auth = require("../middleware/auth");

const router = express.Router();

// create todos
router.post("/create", auth, (req, res) => {
  const { title } = req.body;
  const id = req.userId; // fetched id from auth middleware will be used in todo model

  if (!title || title == "") {
    return res.status(400).json({
      success: false,
      message: "Todo title required",
    });
  }

  TodoModel.create({
    userId: id,
    todo: title,
  });

  return res.status(200).json({
    success: false,
    message: "successfully created",
  });
});

module.exports = router;
