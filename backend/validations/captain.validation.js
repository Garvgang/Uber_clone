const { z } = require("zod");

const registerCaptainSchema = z.object({
    fullname: z.object({
        firstname: z
            .string()
            .trim()
            .min(3, "First name must be at least 3 characters long"),

        lastname: z
            .string()
            .trim()
            .min(3, "Last name must be at least 3 characters long")
            .optional(),    
    }),

    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .min(5, "Email must be at least 5 characters long"),

    vehicle: z.object({
        color: z
            .string()
            .min(3, "Color must be at least 3 characters long"),

        plate: z
            .string()
            .min(3, "Plate must be at least 3 characters long"),

        capacity: z
            .number()
            .min(1, "Capacity must be at least 1"),

        vehicleType: z.enum(["car", "motorcycle", "auto"], {
            error: "Invalid vehicle type",
        }),
    }),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
});

const loginCaptainSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Invalid email address"),

    password: z
        .string({
            required_error: "Password is required",
        })
        .min(6, "Password must be at least 6 characters long"),
});

module.exports = {
    registerCaptainSchema,
    loginCaptainSchema,
};