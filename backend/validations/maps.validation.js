const { z } = require("zod");

const addressSchema = z.object({
    address: z
        .string()
        .min(3)
});
const distanceTimeSchema = z.object({
    origin : z
        .string()
        .min(3),
    destination : z
        .string()
        .min(3),
});

const suggestionsSchema=z.object({
    input : z.string().min(3),
});

module.exports = {
    addressSchema,
    distanceTimeSchema,
    suggestionsSchema
};