import { SupabaseClient } from "@supabase/supabase-js";
import prisma from "../api/prismaClient";
import checkProfileAuth from "./checkProfileAuth";
import { NextResponse } from "next/server";
import checkSuperUserAuth from "./checkSuperUserAuth";

const checkUserAuth = async (
  targetUserId: string, // user id of the data being accessed
  req: Request,
  supabase: SupabaseClient,
  superUserAccess = true, // allows auth via being a super user
  checkReqUserId = true // allows auth if the target user is unregistered but has the same user id as request
) => {
  try {
    if (superUserAccess) {
      const isSuperUser = await checkSuperUserAuth(req, supabase);
      if (isSuperUser) {
        return null;
      }
    }

    const targetProfile = await prisma.profile.findUnique({
      where: { userId: targetUserId },
    });
    prisma.$disconnect();

    if (!targetProfile) {
      const reqUserId = req.headers.get("userId") || "";

      if (checkReqUserId && reqUserId !== targetUserId) {
        return NextResponse.json(
          { message: "Unauthorized user id" },
          { status: 403 }
        );
      }

      return null;
    }

    const targetEmail = targetProfile.email;

    return await checkProfileAuth(targetEmail, req, supabase);
  } catch (error) {
    prisma.$disconnect();
    return NextResponse.json(error, { status: 500 });
  }
};

export default checkUserAuth;
