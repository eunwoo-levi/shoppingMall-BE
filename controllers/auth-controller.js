const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      // bcrypt.compare를 비동기로 처리
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // token 생성
        const token = await user.generateToken();
        console.log(token);
        return res.status(200).json({ status: "success", user, token });
      }
    }

    throw new Error("Invalid email or password");
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) throw new Error("Token not found");
    const token = tokenString.replace("Bearer ", "");
    // token, JWT_SECRET_KEY 를 통해 이 token이 valid한지 verify 해줌
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) throw new Error("invalid token");
      // user.js에서 gerateToken할때 jwt.sign에서 _id를 통해 만들었었다.
      req.userId = payload._id;
    });
    next();
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = authController;
