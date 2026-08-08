const express=require('express');
const router=express.Router();
const authMiddleware=require('../middleware/auth.middleware');
const {getCoordinates,getDistanceTime,getAutoCompleteSuggestions} = require('../controllers/maps.controller');
const {addressSchema, distanceTimeSchema,suggestionsSchema} =require('../validations/maps.validation');
const validate = require('../middleware/validate'); 


router.get('/get-coordinates',
    validate(addressSchema),
    authMiddleware.authUser,
    getCoordinates);

router.get('/get-distance-time',
    validate(distanceTimeSchema),
    authMiddleware.authUser,
    getDistanceTime);

router.get('/get-suggestions',
    validate(suggestionsSchema),
    authMiddleware.authUser,
    getAutoCompleteSuggestions);


module.exports=router;