const express = require("express");
const { Registration, Login, getResetEmail, getSellerDetail } = require("../controllers/SellerController");

const router = express.Router();

router.route("/register").post(Registration);
router.route("/login").post(Login);
router.route("/resetpassword").post(getResetEmail);
router.route("/getseller").post(getSellerDetail);

module.exports = router;
