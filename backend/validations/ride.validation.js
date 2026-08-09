const { z } = require('zod');

const rideSchema = z.object({
    pickup: z
        .string()
        .trim()
        .min(3, "Invalid pickup address"),

    destination: z
        .string()
        .trim()
        .min(3, "Invalid destination address"),

    vehicleType: z.enum(["car", "moto", "auto"], {
        error: "Invalid vehicle type",
    }),
});

const getRideFareSchema = z.object({
    pickup: z
        .string()
        .trim()
        .min(3, "Invalid pickup address"),

    destination: z
        .string()
        .trim()
        .min(3, "Invalid destination address"),
});

const confirmRideSchema = z.object({
    rideId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid ride id"),
});

const startRideSchema = z.object({
    rideId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid ride id"),

    otp: z
        .string()
        .length(6, "Invalid OTP")
        .regex(/^\d{6}$/, "OTP must contain 6 digits"),
});

const endRideSchema = z.object({
    rideId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid ride id"),
});

module.exports = {
    rideSchema,
    getRideFareSchema,
    confirmRideSchema,
    startRideSchema,
    endRideSchema,
};