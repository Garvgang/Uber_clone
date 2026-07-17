const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/user.controller");
const validate = require("../middleware/validate");
const registerUserSchema = require("../validations/user.validation");

router.post("/register", validate(registerUserSchema), registerUser);

module.exports = router;