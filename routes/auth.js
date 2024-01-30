const express = require("express");
const signup = require("../controllers/auth/signup");
const login = require("../controllers/auth/login");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
