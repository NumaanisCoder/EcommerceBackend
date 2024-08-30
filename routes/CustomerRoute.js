const express = require('express');
const { Registration } = require('../controllers/CustomerController');

const router = express.Router();

router.route("/register").post(Registration);







module.exports = router;