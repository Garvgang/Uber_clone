const express = require("express");
const router = express.Router();

const { registerUser,loginUser } = require("../controllers/user.controller");
const validate = require("../middleware/validate");
const {registerUserSchema,loginUserSchema} = require("../validations/user.validation");

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", validate(loginUserSchema), loginUser);

module.exports = router;