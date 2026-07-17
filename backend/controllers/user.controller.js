const userModel = require("../models/user.model");
const userService = require("../services/user.service");

exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            fullname,
            email,
            password: hashedPassword,
        });

        const token = user.generateAuthToken();

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message,
        });
    }
};
exports.loginUser=async (req,res)=>{
    try {
        const { fullname, email, password } = req.body;

        const user = await userModel
            .findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or passwords",
            });
        }
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = user.generateAuthToken();

        res.status(200).json({
            message: "Login successfully",
            token,
            user:{
                id:user._id,
                fullname:user.fullname,
                email:user.email,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
}