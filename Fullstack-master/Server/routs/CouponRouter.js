const express = require("express");
const router = express.Router();

const CouponController = require("../controlers/CouponController");
// const paymentsController = require("../controlers/PaymentControler");

router.post("/applyCoupons", CouponController.applyCoupon);
router.post("/createCoupon", CouponController.NewCoupon);
router.put("/DeleteCoupon/:id", CouponController.DeleteCoupon);
router.get("/getCouponByCode", CouponController.getCouponByCode);
router.get("/getCouponByid/:id", CouponController.getCouponByid);

module.exports = router;
