import prisma from "@/app/api/prismaClient";
import { supabase } from "@/app/api/supabaseClient";
import checkUserAuth from "@/app/utils/checkUserAuth";
import { transformIssueGetData } from "@/app/utils/transformResponses";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    const auth = await checkUserAuth(id, req, supabase, false);
    if (auth) {
      return auth;
    }

    const data = await prisma.issue.findMany({
      where: { userId: id },
      include: { category: true, status: true },
    });
    prisma.$disconnect();

    const decodedData = data.map(transformIssueGetData);

    return NextResponse.json(decodedData);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};
