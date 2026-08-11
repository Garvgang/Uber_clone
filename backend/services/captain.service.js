// this will interact with mongodb
const captainModel=require('../models/captain.model');

const createCaptain=async ({fullname,email,password,color,plate,vehicle,vehicleType,location})=>{
    if (!fullname?.firstname || !email || !password || !vehicle || !location) {
        throw new Error('All fields are required');
    }
    if (!vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
        throw new Error('All vehicle fields are required');
    }
    const captain=await captainModel.create({
        fullname:{
            firstname:fullname.firstname,
            lastname:fullname.lastname || ''
        },
        email,
        password,
        vehicle:{
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType,
        },
        location
    });
    return captain;
};

module.exports={createCaptain};