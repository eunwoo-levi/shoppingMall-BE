const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const authController = require("../controllers/auth-controller");

//  회원가입  -  /api/user          ,  router에 쓰이는 콜백함수 (userController) 에는 req,res 값을 받는다
router.post("/", userController.createUser);

// token값을 user에게 줘야하기 때문에
// token이 valid한 토큰인지, 이 token가지고 유저를 찾아서 리턴
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
