const express = require("express");
const router = express.Router();
const WorkShopController = require("../controlers/WorkShop");
const uploadImg = require("../middlewares/MulterMiddlewares");


router.get("/getAllShop", WorkShopController.getAllShop);
router.get("/getShopid/:workshop_id", WorkShopController.getShopid);
router.post("/newShop",uploadImg.uploadImg, WorkShopController.newShop);
router.put("/deleteShop/:workshop_id", WorkShopController.deleteShop);
router.put("/updateShop/:workshop_id", WorkShopController.updateShop);

module.exports = router;
