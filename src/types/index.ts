import { z } from "zod";
import { signupSchema } from "@/lib/validation";

export type SignUpInput = z.infer<typeof signupSchema>;
export interface SignUpFormState {
  errors: {
    fullname?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}
