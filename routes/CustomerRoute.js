const express = require('express');
const { Registration, Login, getResetEmail, getCustomerDetail } = require('../controllers/CustomerController');

const router = express.Router();

router.route("/register").post(Registration);
router.route("/login").post(Login);
router.route("/resetpassword").post(getResetEmail);
router.route("/getcustomer").post(getCustomerDetail);






module.exports = router;