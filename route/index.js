const express = require("express");
const router = express.Router();
const userApi = require("./user-api");
const authApi = require("./auth-api");

//      api/user
router.use("/user", userApi);
//      api/login
router.use("/auth", authApi);

module.exports = router;
