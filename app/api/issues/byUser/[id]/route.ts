import prisma from "@/app/utils/prismaClient";
import { supabase } from "@/app/utils/supabaseClient";
import checkUserAuth from "@/app/utils/checkUserAuth";
import { transformIssueGetData } from "@/app/utils/transformResponses";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/issues/byUser/{id}:
 *   get:
 *     summary: Gets a list of issues posted by a specific user
 *     description: Gets a list of issues posted by a specific user. If the user is not signed up, only the user Id is required. If the user is signed up, the authorization token is required.
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: User Id (UUID) of the specific user
 *       - in: header
 *         name: userId
 *         type: string
 *         description: User Id (UUID) for authentication
 *       - in: header
 *         name: email
 *         type: string
 *         description: User email for authentication
 *       - in: header
 *         name: authorization
 *         type: string
 *         description: Supabase JWT for authentication
 *     responses:
 *       200:
 *         description: Successful fetch
 *       401:
 *         description: Missing credentials for this user
 *       403:
 *         description: Invalid credentials for this user
 *       500:
 *         description: Server error
 */

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
