import hashEmail from "@/app/utils/hashEmail";
import prisma from "../../../utils/prismaClient";
import { NextResponse } from "next/server";
import { validateProfilePatch } from "../../../utils/validation";
import checkProfileAuth from "@/app/utils/checkProfileAuth";
import supabaseImages, { supabase } from "../../../utils/supabaseClient";

/**
 *  @swagger
 * /api/profiles/{email}:
 *   get:
 *     summary: Gets a specific profile
 *     description: Gets a specific profile
 *     parameters:
 *       - in: path
 *         name: email
 *         type: string
 *         required: true
 *         description: email of the specific profile
 *       - in: header
 *         name: authorization
 *         type: string
 *         required: true
 *         description: Supabase JWT for authentication
 *     responses:
 *       200:
 *         description: Successful fetch
 *       401:
 *         description: Missing credentials for this profile
 *       403:
 *         description: Invalid credentials for this profile
 *       404:
 *         description: profile not found
 *       500:
 *         description: Server error
 *   patch:
 *     summary: Updates a specific profile
 *     description: Updates a specific profile
 *     parameters:
 *       - in: path
 *         name: email
 *         type: string
 *         required: true
 *         description: email of the specific profile
 *       - in: body
 *         name: data
 *         description: The data to change
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the profile
 *             phone:
 *               type: string
 *               description: Phone number of the profile
 *             roleId:
 *               type: integer
 *               minimum: 1
 *               description: 1 for regular user, 2 for super user (access to completing and changing statuses of issues)
 *       - in: header
 *         name: authorization
 *         type: string
 *         required: true
 *         description: Supabase JWT for authentication
 *     responses:
 *       200:
 *         description: Successful patch
 *       400:
 *         description: Invalid body data
 *       401:
 *         description: Missing credentials for this profile
 *       403:
 *         description: Invalid credentials for this profile
 *       404:
 *         description: profile not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Deletes a specific profile
 *     description: Deletes a specific profile
 *     parameters:
 *       - in: path
 *         name: email
 *         type: string
 *         required: true
 *         description: email of the specific profile
 *       - in: header
 *         name: authorization
 *         type: string
 *         required: true
 *         description: Supabase JWT for authentication
 *     responses:
 *       200:
 *         description: Successful delete
 *       401:
 *         description: Missing credentials for this profile
 *       403:
 *         description: Invalid credentials for this profile
 *       404:
 *         description: profile not found
 *       500:
 *         description: Server error
 */

export const GET = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
    const auth = await checkProfileAuth(params.email, req, supabase);
    if (auth) {
      return auth;
    }

    const hash = hashEmail(params.email);

    const data = await prisma.profile.findUnique({
      where: { hash },
    });

    prisma.$disconnect();

    if (!data) {
      return NextResponse.json(data, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
    const body = await req.json();

    const validate = validateProfilePatch(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    const auth = await checkProfileAuth(params.email, req, supabase);
    if (auth) {
      return auth;
    }

    const hash = hashEmail(params.email);

    const found = await prisma.profile.findUnique({ where: { hash } });
    if (!found) {
      prisma.$disconnect();

      return NextResponse.json(found, { status: 404 });
    }

    const data = await prisma.profile.update({
      where: { hash },
      data: body,
    });

    prisma.$disconnect();

    return NextResponse.json(data);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
    const auth = await checkProfileAuth(params.email, req, supabase);
    if (auth) {
      return auth;
    }

    const hash = hashEmail(params.email);

    const found = await prisma.profile.findFirst({ where: { hash } });

    if (!found) {
      prisma.$disconnect();
      return NextResponse.json(found, { status: 404 });
    }

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    const { data, error } = await supabase.auth.getUser(token);

    // this check is probably not needed but the api requires the data to get the auth user id from supabase which is used to delete it later
    if (!data || error) {
      return NextResponse.json(error, { status: 404 });
    }

    const issues = await prisma.issue.findMany({
      where: { userId: found.userId },
    });
    if (issues.length > 0) {
      issues.forEach((issue) => {
        const filePath = issue.filePath;
        supabaseImages.remove([filePath]);
      });
    }

    const supabaseId = data.user.id;

    const deleteProfile = await supabase.auth.admin.deleteUser(supabaseId);

    if (deleteProfile.error || !deleteProfile.data) {
      return NextResponse.json(deleteProfile.error, { status: 500 });
    }

    const result = await prisma.user.delete({
      where: { id: found.userId },
    });
    prisma.$disconnect();

    return NextResponse.json(result);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};
