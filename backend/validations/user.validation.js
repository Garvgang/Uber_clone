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

const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

module.exports = {registerUserSchema,loginUserSchema};