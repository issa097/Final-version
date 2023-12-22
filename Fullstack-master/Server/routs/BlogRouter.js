const express = require("express");
const router = express.Router();
const BlogController = require("../controlers/BlogController");
const authentication = require('../middlewares/authMiddleware')
const uploadImg = require("../middlewares/MulterMiddlewares");


router.get("/getAllBlog", BlogController.getAllBlog);
router.get("/getBlog/:blog_id", BlogController.getBlog);
router.get("/getBlogidUser",authentication.authenticateToken, BlogController.getBlogidUser);
router.get("/blog/:page/:limit", BlogController.getBlogpagi);

router.post("/newblog", authentication.authenticateToken,uploadImg.uploadImg, BlogController.newblog);
router.put("/Deleteblog/:blog_id", BlogController.Deleteblog);
router.put("/updateblog/:blog_id", BlogController.updateblog);

router.get("/approvedblog", BlogController.approved);
router.put("/approvedUpdate/:blog_id", BlogController.approvedUpdate);
router.put("/approvedReject/:blog_id", BlogController.approvedReject);

module.exports = router;
