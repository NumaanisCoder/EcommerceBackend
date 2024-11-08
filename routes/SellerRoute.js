const express = require("express");
const { Registration, Login, getResetEmail, getSellerDetail, verifyEmail } = require("../controllers/SellerController");

const router = express.Router();

router.route("/register").post(Registration);
router.route("/login").post(Login);
router.route("/resetpassword").post(getResetEmail);
router.route("/getseller").post(getSellerDetail);
router.route("/verifymail/:token").get(verifyEmail);

module.exports = router;
