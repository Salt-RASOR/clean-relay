import prisma from "../api/prismaClient";

const generateUser = async (userId?: string, register = false) => {
  let found;
  if (userId) {
    found = await prisma.user.findUnique({
      where: { id: userId },
    });
    prisma.$disconnect();

    if (found && register) {
      const profile = await prisma.profile.findUnique({ where: { userId } });

      if (profile) {
        found = false;
      }
    }
  }

  if (!userId || !found) {
    const newUser = await prisma.user.create({ data: {} });
    prisma.$disconnect();
    return newUser.id;
  }

  return userId;
};

export default generateUser;
