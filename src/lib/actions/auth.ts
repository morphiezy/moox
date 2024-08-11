"use server";

import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { randomBytes } from "crypto";
import { resend } from "../resend";
import { prisma } from "../auth";
import { hash } from "../utils";
import { signupSchema } from "../validation";
import VerifyEmail from "@/components/auth/email-verification";
import type { SignUpFormState } from "@/types";
import { findUserByEmail } from "./user";

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

  const email = formData.get("email") as string;
  const fullname = formData.get("fullname") as string;
  const password = formData.get("password") as string;

  try {
    const existingUser = await findUserByEmail(email);

    if (!!existingUser && !existingUser.emailVerified) {
      await handleResendVerification(existingUser);
    } else if (!!existingUser) {
      return {
        errors: {
          email: ["Email already in exist"],
        },
      };
    } else {
      await createUserAndSendVerification(email, fullname, password);
    }
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    } else {
      return { errors: { _form: ["Something went wrong"] } };
    }
  }

  redirect("/auth/verify/send?email=" + email);
};

const createUserAndSendVerification = async (
  email: string,
  fullname: string,
  password: string,
) => {
  const hashedPassword = await hash(password);
  const verificationToken = randomBytes(32).toString("hex");

  const user = await prisma.user.create({
    data: {
      email,
      fullname,
      password: hashedPassword,
      VerificationToken: {
        create: {
          token: verificationToken,
          expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      },
    },
  });

  await sendVerificationEmail(user.email, user.fullname, verificationToken);
};

const handleResendVerification = async (user: User) => {
  const verificationToken = randomBytes(32).toString("hex");

  await prisma.verificationToken.update({
    where: { userId: user.id },
    data: {
      token: verificationToken,
      expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  await sendVerificationEmail(user.email, user.fullname, verificationToken);
};

const sendVerificationEmail = async (
  email: string,
  fullname: string,
  token: string,
) => {
  try {
    await resend.emails.send({
      from: "Moox <verify@yardan.my.id>",
      to: email,
      subject: "Moox Verification Token",
      react: VerifyEmail({ fullname: fullname, token: token }),
    });
  } catch (error) {
    throw new Error("Failed to send verification email");
  }
};
