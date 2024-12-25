const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserSchema");

const auth = async (req, res, next) => {
  // extract token from headers
  const token = req.headers["authorization"];

  // if token not available
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "token verification failed signin again",
    });
  }

  try {
    // decode the token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_KEY); // if error arises then catch block will handle error arises when token expires

    // fetch user from database
    const user = await UserModel.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user failed to authenticate",
      });
    }

    req.userId = user._id;
    return next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
};

module.exports = auth;
