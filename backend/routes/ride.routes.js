const express=require('express');
const router=express.Router();
const validate=require('../middleware/validate');
const authMiddleware=require('../middleware/auth.middleware');
const {rideSchema}=require('../validations/ride.validation');
const rideController=require('../controllers/ride.controller');

router.post(
    '/create',
    validate(rideSchema),
    authMiddleware.authUser,
    rideController.createRide
);


module.exports=router;