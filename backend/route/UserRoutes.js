require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// mongoose model
const { UserModel, TodoModel } = require("../model/UserSchema");

const router = express.Router();

// User Routes only contains signin and signup endpoints
router.post("/signup", async (req, res) => {
  const { name, email, pass } = req.body;

  if (!name || !email || !pass) {
    return res.status(400).json({
      success: false,
      message: "required fields are necessary !!!",
    });
  }

  try {
    //check for existing user
    const user = await UserModel.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "user exists with this email !!!",
      });
    }

    //to store the pass it has to be in hashed form
    const hashPass = await bcrypt.hash(pass, 10);
    await UserModel.create({
      name: name,
      email: email,
      passwd: hashPass,
    });

    res.status(200).json({
      success: true,
      message: "user created",
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, pass } = req.body;

  // check for the given fields are given or not
  if (!email || !pass) {
    return res.status(400).json({
      success: false,
      message: "required fields are necessary !!!",
    });
  }

  // find for user with same email given
  const user = await UserModel.findOne({ email: email });

  // if user not found
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "No such user found !!!",
    });
  }

  // if user found then check pass
  if (!(await bcrypt.compare(pass, user.passwd))) {
    return res.status(400).json({
      success: false,
      message: "unable to login, given credentials are wrong !!!",
    });
  }

  // if password given in body of request is right
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  // token created and returned to the client
  return res.status(200).json({
    success: false,
    message: "Authentication successfully",
    token: token,
  });
});

module.exports = router;
