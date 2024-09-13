const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();

// get이 아닌 post로 email,password 등 가져옴 -> post를 쓰면 body의 정보를 가져올 수 있다. 프론트엔드에서 body에 email,password등을 넣어서 보내줘야 함
router.post("/login", authController.loginWithEmail);

module.exports = router;
