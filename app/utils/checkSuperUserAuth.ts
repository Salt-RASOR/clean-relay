import { SupabaseClient } from "@supabase/supabase-js";
import prisma from "../api/prismaClient";
import hashEmail from "./hashEmail";

const checkSuperUserAuth = async (req: Request, supabase: SupabaseClient) => {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return null;
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (!data || error) {
      return null;
    }

    const hash = hashEmail(data.user.email || "");

    const user = await prisma.profile.findUnique({ where: { hash } });
    prisma.$disconnect();

    if (!user) {
      return null;
    }

    return user.roleId === 2;
  } catch (error) {
    prisma.$disconnect();
    return null;
  }
};

export default checkSuperUserAuth;
