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
      error: err,
    });
  }
  // find the todo with the help of user id
});

//auth will be added when in use

// using req.query with url paramaters
// link that will hit this route :- http://localhost:3000/todo/remove?id=677403db4e06293a5a58b1f1
// router.get("/remove", async (req, res) => {
//   const todoId = req.query.id;
//   const todo = await TodoModel.findOne({ _id: todoId });
//   console.log(todo.title);
// });

//using req.params with the routes
// link that will hit this route :- http://localhost:3000/todo/remove/677403db4e06293a5a58b1f1
// router.get("/remove/:id", async (req, res) => {
//   const todoid = req.params.id;
//   const todo = await TodoModel.findOne({ _id: todoid });
//   console.log(todo.title);
// });

//using the put method to delete the todo having id in the url
router.put("/remove", async (req, res) => {
  const todoId = req.query.id;
  await TodoModel.deleteOne({ _id: todoId })
    .then((response) => {
      console.log("deleted");
      return res.status(200).json({
        success: true,
        message: response,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        success: false,
        message: err,
      });
    });
});

module.exports = router;
