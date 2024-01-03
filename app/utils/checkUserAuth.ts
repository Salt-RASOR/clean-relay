import { SupabaseClient } from "@supabase/supabase-js";
import prisma from "../api/prismaClient";
import checkProfileAuth from "./checkProfileAuth";
import { NextResponse } from "next/server";

const checkUserAuth = async (
  userId: string,
  req: Request,
  supabase: SupabaseClient,
  checkReqUserId = true
) => {
  try {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    prisma.$disconnect();

    if (!profile) {
      if (checkReqUserId) {
        const reqUserId = req.headers.get("userId");
        if (reqUserId !== userId) {
          return NextResponse.json(
            { message: "Unauthorized user id" },
            { status: 403 }
          );
        }
      }

      return null;
    }

    const email = profile.email;

    return await checkProfileAuth(email, req, supabase);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export default checkUserAuth;
