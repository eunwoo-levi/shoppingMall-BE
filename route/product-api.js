const express = require("express");
const authController = require("../controllers/auth-controller");
const productController = require("../controllers/product-controller");
const router = express.Router();

// product 생성은 admin만 가능함! 그래서 admin인지 아닌지 확인하는 과정이 필요! 일단 authenticate으로 valid한 token인지 확인한 후, checkAdminPermisson
router.post(
  "/",
  authController.authenticate,
  authController.checkAdminPermisson,
  productController.createProduct
);

module.exports = router;
