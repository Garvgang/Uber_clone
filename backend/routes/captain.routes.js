const express=require('express');
const router=express.Router();

// router.post('/name_ofroute',middleware(zod_validation),controller)
const {registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain} =require('../controllers/captain.controller');
const {registerCaptainSchema,loginCaptainSchema} =require('../validations/captain.validation');
const authMiddleware=require('../middleware/auth.middleware');
const validate = require('../middleware/validate');

router.post('/register',validate(registerCaptainSchema),registerCaptain);
router.post('/login',validate(loginCaptainSchema),loginCaptain);
router.get('/profile',authMiddleware.authCaptain,getCaptainProfile);
router.get('/logout',authMiddleware.authCaptain,logoutCaptain);

module.exports=router;