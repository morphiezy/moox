import { prisma } from "../auth";

export const findUserByEmail = async (email: string) => {
  const user = prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};
