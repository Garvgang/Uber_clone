const express = require("express");
const router = express.Router();

const { registerUser,loginUser,getUserProfile,logoutUser } = require("../controllers/user.controller");
const validate = require("../middleware/validate");
const authMiddleware=require('../middleware/auth.middleware');
const {registerUserSchema,loginUserSchema} = require("../validations/user.validation");

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.get("/profile",authMiddleware.authUser,getUserProfile);
router.get("/logout",authMiddleware.authUser,logoutUser);

module.exports = router;