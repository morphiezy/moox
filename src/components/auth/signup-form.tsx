"use client";

import React from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { FormMessage } from "../form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputPassword } from "../input-password";
import { signUp } from "@/lib/actions/auth";
import { SignUpFormState } from "@/types";
import { SignUpButton } from "./signup-button";

export function SignUpForm() {
  const [formState, action] = useFormState<SignUpFormState, FormData>(signUp, {
    errors: {},
  });

  return (
    <form action={action}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Fullname</Label>
          <Input
            id="fullname"
            name="fullname"
            type="text"
            placeholder="Jhon Doe"
            required
          />
          <FormMessage error={formState?.errors?.fullname?.join(", ")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="example@moox.com"
            required
          />
          <FormMessage error={formState?.errors?.email?.join(", ")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <InputPassword
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <FormMessage error={formState?.errors?.password?.join(", ")} />
        </div>
        <SignUpButton />
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline">
          Sign in
        </Link>
      </div>
    </form>
  );
}
