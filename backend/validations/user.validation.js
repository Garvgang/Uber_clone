// this is the blueprint for validation 
const { z } = require("zod");

const registerUserSchema = z.object({
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

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

module.exports = registerUserSchema;