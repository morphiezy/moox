import { z } from "zod";

const signupSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required" }),
  email: z.string().email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(6, { message: "Password is required" })
    .max(8, { message: "Password must be at least 6 - 8 characters" }),
});

export { signupSchema };
