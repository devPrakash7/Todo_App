
const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/userSignup");


router.post("/api/SignUp" , Controller.SingUp);
router.post("/api/Login" , Controller.Login);


module.exports = router;