const express = require("express");

const { TodoModel } = require("./../model/UserSchema");
const auth = require("../middleware/auth");

const router = express.Router();

// create todos
router.post("/create", auth, async (req, res) => {
  const { title } = req.body;
  const id = req.userId; // fetched id from auth middleware will be used in todo model

  if (!title || title == "") {
    return res.status(400).json({
      success: false,
      message: "Todo title required",
    });
  }

  // todo created if title found valid
  await TodoModel.create({
    userId: id,
    todo: title,
  });

  return res.status(200).json({
    success: true,
    message: "successfully created",
  });
});

router.get("/view", auth, async (req, res) => {
  const id = req.userId;

  // find the todo with the help of user id
  const data = await TodoModel.find({ userId: id });

  if (data.length == 0) {
    res.status(300).json({
      success: true,
      message: "add todos then view todos",
    });
  }

  return res.status(200).json({
    data,
  }); // data is in the form of array of objects
});

module.exports = router;
