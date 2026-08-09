const express=require('express');
const router=express.Router();
const validate=require('../middleware/validate');
const authMiddleware=require('../middleware/auth.middleware');
const {rideSchema,getRideFareSchema}=require('../validations/ride.validation');
const rideController=require('../controllers/ride.controller');

router.post(
    '/create',
    validate(rideSchema),
    authMiddleware.authUser,
    rideController.createRide
);

router.get(
    '/get-fare',
    authMiddleware.authUser,
    validate(getRideFareSchema),
    rideController.getFare
);


router.post(
    '/confirm',
    authMiddleware.authCaptain,
    validate(confirmRideSchema),
    rideController.confirmRide
);


router.get(
    '/start-ride',
    authMiddleware.authCaptain,
    validate(startRideSchema),
    rideController.startRide
);


router.post(
    '/end-ride',
    authMiddleware.authCaptain,
    validate(endRideSchema),
    rideController.endRide
);

module.exports=router;