import { SupabaseClient } from "@supabase/supabase-js";
import prisma from "./prismaClient";
import checkUserAuth from "./checkUserAuth";

const generateUser = async (
  userId?: string,
  register = false,
  req?: Request,
  supabase?: SupabaseClient
) => {
  let found;
  if (userId) {
    found = await prisma.user.findUnique({
      where: { id: userId },
    });
    prisma.$disconnect();

    if (found) {
      if (register) {
        const profile = await prisma.profile.findUnique({ where: { userId } });

        if (profile) {
          found = false;
        }
      } else {
        const auth = await checkUserAuth(userId, req!, supabase!, false, false);
        if (auth) {
          return null;
        }
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
