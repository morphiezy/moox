import { z } from "zod";

const emailSchema = z.string().email({ message: "Email is invalid" });

const signupSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required" }),
  email: emailSchema,
  password: z
    .string()
    .min(6, { message: "Minimal password length is 6" })
    .max(8, { message: "Password must be at least 6 - 8 characters" }),
});

export { signupSchema, emailSchema };
