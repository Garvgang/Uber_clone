const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const captainSchema=mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'First name must be at least 3 character long'],
        },
        lastname:{
            type:String,
            required: false,
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email"
        ]
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:"inactive",
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,'Color must be at least 3 characters long']
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'Plate number must be atleast 3 characters long'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be atleast 1'],
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto'],
        }
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
};

captainSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
};

captainSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


const captainModel = mongoose.model("Captain", captainSchema);

module.exports=captainModel;