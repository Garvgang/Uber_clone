const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const userModel = require('../models/user.model');

module.exports.createRide = async (req, res) => {
    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        console.log("PICKUP COORDINATES:", pickupCoordinates);

        const captainsInRadius =
            await mapService.getCaptainsInTheRadius(
                pickupCoordinates.latitude,
                pickupCoordinates.longitude,
                2
            );

        console.log(
            "CAPTAINS IN RADIUS:",
            captainsInRadius.map(captain => ({
                id: captain._id,
                socketId: captain.socketId
            }))
        );

        const rideWithUser = await rideModel.findById(ride._id).populate('user');

        captainsInRadius.forEach(captain => {
            if (captain.socketId) {
                sendMessageToSocketId(
                    captain.socketId,
                    {
                        event: 'new-ride',
                        data: rideWithUser
                    }
                );
            }
        });

        return res.status(201).json(ride);

    } catch (err) {
        console.error("CREATE RIDE ERROR:", err);

        return res.status(400).json({
            message: err.message
        });
    }
};


module.exports.getFare = async (req, res) => {

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(
            pickup,
            destination
        );

        return res.status(200).json(fare);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


module.exports.confirmRide = async (req, res) => {

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({
            rideId,
            captain: req.captain
        });
        console.log("RIDE CONFIRMED:");
        console.log("USER SOCKET ID:", ride.user.socketId);
        console.log("CAPTAIN:", ride.captain);
        console.log("OTP:", ride.otp);
        
        sendMessageToSocketId(
            ride.user.socketId,
            {
                event: 'ride-confirmed',
                data: ride
            }
        );

        return res.status(200).json(ride);

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
};


module.exports.startRide = async (req, res) => {

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({
            rideId,
            otp,
            captain: req.captain
        });

        sendMessageToSocketId(
            ride.user.socketId,
            {
                event: 'ride-started',
                data: ride
            }
        );

        return res.status(200).json(ride);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};


module.exports.endRide = async (req, res) => {

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({
            rideId,
            captain: req.captain
        });

        sendMessageToSocketId(
            ride.user.socketId,
            {
                event: 'ride-ended',
                data: ride
            }
        );

        return res.status(200).json(ride);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};