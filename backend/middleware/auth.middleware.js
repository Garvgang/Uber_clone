const blacklistedTokenModel = require('../models/blacklistToken.model');
const userModel=require('../models/user.model');
const captainModel=require('../models/captain.model');
const jwt=require('jsonwebtoken');

module.exports.authUser=async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message:"Unathorized token"
        });
    }
    const isBlackListed=await blacklistedTokenModel.findOne({token:token});
    if(isBlackListed){
        return res.status(401).json({
            message: "Unauthorized - Token is blacklisted"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user= await userModel.findById(decoded._id);
        req.user=user;
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        return next();
    }
    catch(err){
        return res.status(401).json({
            message:"Unathorized token"
        })
    }
}
module.exports.authCaptain=async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message:"Unathorized token"
        });
    }

    const isBlackListed=await blacklistedTokenModel.findOne({token:token});
    
    if(isBlackListed){
        return res.status(401).json({
            message:"Unauthorized - Token is blacklisted"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain= await captainModel.findById(decoded._id);
        req.captain=captain;
        
        if (!captain) {
            return res.status(401).json({
                message: "Captain not found"
            });
        }
        return next();
    }
    catch(err){
        return res.status(401).json({
            message:"Unathorized token"
        })
    }
}