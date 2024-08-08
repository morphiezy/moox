"use server";

import bcryptjs from "bcryptjs";
import { redirect } from "next/navigation";
import { randomBytes } from "crypto";
import { User } from "@prisma/client";
import { prisma } from "../auth";
import { signupSchema } from "../validation";
import type { SignUpFormState } from "@/types";

export const signUp = async (
  currentState: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> => {
  const input = signupSchema.safeParse({
    fullname: formData.get("fullname"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!input.success) {
    return {
      errors: input.error.flatten().fieldErrors,
    };
  }

  const isUserAvailable = await findUserByEmail(
    formData.get("email") as string,
  );

  if (!!isUserAvailable) {
    return {
      errors: {
        email: ["Email already in exist"],
      },
    };
  }

  const hashed = await hashedPassword(formData.get("password") as string);
  const verificationToken = randomBytes(32).toString("hex");

  let user: User;

  try {
    user = await prisma.user.create({
      data: {
        email: formData.get("email") as string,
        fullname: formData.get("fullname") as string,
        password: hashed,
        VerificationToken: {
          create: {
            token: verificationToken,
            expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  redirect("/");
};

const findUserByEmail = async (email: string) => {
  const user = prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const hashedPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};
