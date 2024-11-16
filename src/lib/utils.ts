import { z } from "zod";
import bcryptjs from "bcryptjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hash = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};
