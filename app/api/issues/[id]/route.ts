import { NextRequest, NextResponse } from "next/server";
import { validateIssuePatch } from "../../../utils/validation";
import prisma from "@/app/utils/prismaClient";
import { transformIssueGetData } from "@/app/utils/transformResponses";
import supabaseImages, { supabase } from "@/app/utils/supabaseClient";
import checkUserAuth from "@/app/utils/checkUserAuth";
import checkSuperUserAuth from "@/app/utils/checkSuperUserAuth";
import getIssuePoints from "@/app/utils/getIssuePoints";

/**
 * @swagger
 * /api/issues/{id}:
 *   get:
 *     summary: Gets a specific issue
 *     description: Gets a specific issue
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: Issue Id (UUID) of the specific issue
 *     responses:
 *       200:
 *         description: Successful fetch
 *       404:
 *         description: Issue not found
 *       500:
 *         description: Server error
 *   patch:
 *     summary: Updates a specific issue
 *     description: Updates a specific issue
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: Issue Id (UUID) of the specific issue
 *       - in: body
 *         name: data
 *         description: The data to change
 *         schema:
 *           type: object
 *           required:
 *             - statusId
 *           properties:
 *             statusId:
 *               type: integer
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
 *         description: Successful patch
 *       400:
 *         description: Invalid body data
 *       401:
 *         description: Missing credentials for this user
 *       403:
 *         description: Invalid credentials for this user
 *       404:
 *         description: Issue not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Deletes a specific issue
 *     description: Deletes a specific issue
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: Issue Id (UUID) of the specific issue
 *       - in: header
 *         name: complete
 *         type: string
 *         description: set to "true" to give points to the reporting user
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
 *         description: Successful delete
 *       401:
 *         description: Missing credentials for this user
 *       403:
 *         description: Invalid credentials for this user
 *       404:
 *         description: Issue not found
 *       500:
 *         description: Server error
 */

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    const data = await prisma.issue.findUnique({
      where: { id },
      include: { category: true, status: true },
    });
    prisma.$disconnect();

    if (!data) {
      return NextResponse.json(data, { status: 404 });
    }

    const decodedData = transformIssueGetData(data);

    return NextResponse.json(decodedData);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await req.json();

    const validate = validateIssuePatch(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    const id = Number(params.id);
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) {
      prisma.$disconnect();

      return NextResponse.json(issue, { status: 404 });
    }

    const isSuperUser = await checkSuperUserAuth(req, supabase);
    if (!isSuperUser) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }

    const data = await prisma.issue.update({
      where: { id },
      data: body,
      include: { category: true, status: true },
    });

    prisma.$disconnect();

    const decodedData = transformIssueGetData(data);

    return NextResponse.json(decodedData);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    const issue = await prisma.issue.findFirst({ where: { id } });

    if (!issue) {
      prisma.$disconnect();
      return NextResponse.json(issue, { status: 404 });
    }

    const completed = req.nextUrl.searchParams.get("complete") === "true";

    if (completed) {
      const isSuperUser = await checkSuperUserAuth(req, supabase);
      if (!isSuperUser) {
        return NextResponse.json(
          { message: "Unauthorized access" },
          { status: 403 }
        );
      }
    } else {
      const auth = await checkUserAuth(issue.userId, req, supabase);
      if (auth) {
        return auth;
      }
    }

    const filePath = issue.filePath;

    await supabaseImages.remove([filePath]);

    const result = await prisma.issue.delete({
      where: { id },
      include: { category: true, status: true },
    });

    if (completed) {
      const userId = result.userId;

      const points = getIssuePoints(result);

      await prisma.profile.update({
        where: { userId },
        data: { points: { increment: points } },
      });
    }

    prisma.$disconnect();

    const decodedData = transformIssueGetData(result);

    return NextResponse.json(decodedData);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};
