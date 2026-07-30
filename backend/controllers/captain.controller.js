const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blackListTokenModel=require('../models/blacklistToken.model');

exports.registerCaptain = async (req, res) => {
    try {
        const { fullname, email, password ,vehicle} = req.body;

        const existingCaptain= await captainModel.findOne({ email });

        if (existingCaptain) {
            return res.status(409).json({
                message: "Captain already exists",
            });
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            fullname,
            email,
            password: hashedPassword,
            vehicle,
        });

        const token = captain.generateAuthToken();

        res.status(201).json({
            message: "Captain registered successfully",
            token,
            captain,
        });
    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message,
        });
    }
};
exports.loginCaptain=async (req,res)=>{
    try {
        const { email, password } = req.body;

        const captain = await captainModel
            .findOne({ email }).select("+password");

        if (!captain) {
            return res.status(401).json({
                message: "Invalid email or passwords",
            });
        }
        const isMatch = await captain.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = captain.generateAuthToken();

        res.status(200).json({
            message: "Login successfully",
            token,
            captain:{
                id:captain._id,
                fullname:captain.fullname,
                email:captain.email,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
}
exports.getCaptainProfile = async (req, res) => {
    res.status(200).json({
        id: req.captain._id,
        fullname: req.captain.fullname,
        email: req.captain.email
    });
};
exports.logoutCaptain=async (req,res)=>{
    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blackListTokenModel.create({token})
    res.status(200).json({
        message:"Logged out"
    })
}