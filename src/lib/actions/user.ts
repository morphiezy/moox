"use server";

import { prisma } from "../prisma";

export const findUserByEmail = async (email: string) => {
  const user = prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};
