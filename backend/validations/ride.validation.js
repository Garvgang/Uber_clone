const {z} =require('zod');

const rideSchema=z.object({
    pickup : z
        .string()
        .min(3,"Invalid pickup address"),
    destination : z
        .string()
        .min(3,"Invalid destination address"),
    vehicleType : z
        .enum(["car", "moto", "auto"], {
            error: "Invalid vehicle type",
        }),
});

module.exports={
    rideSchema
};