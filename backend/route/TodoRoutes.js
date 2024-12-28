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
    title: title,
  });

  return res.status(200).json({
    success: true,
    message: "successfully created",
  });
});

router.get("/view", auth, async (req, res) => {
  const id = req.userId;

  try {
    const data = await TodoModel.find({ userId: id });

    if (data.length == 0) {
      return res.status(200).json({
        success: true,
        message: "add todos then view todos",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your todos",
      data: data,
    }); // data is in the form of array of objects
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err
    });
  }
  // find the todo with the help of user id
});

module.exports = router;
