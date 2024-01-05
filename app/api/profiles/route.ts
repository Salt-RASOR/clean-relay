import { NextResponse } from "next/server";
import { validateProfilePost } from "../../utils/validation";
import prisma from "../../utils/prismaClient";
import hashEmail from "@/app/utils/hashEmail";
import generateUser from "@/app/utils/generateUser";

/**
 *  @swagger
 * /api/profiles:
 *   post:
 *     summary: Creates a new user profile.
 *     description: Creates a new user profile. Can use the userId in the body to save the user's created issues if the user is not already registered under a profile. Will create a new user id if it is already in use.
 *     parameters:
 *       - in: body
 *         name: data
 *         description: The data to use for a new profile
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *               description: email to be used for logging in
 *             userID:
 *               type: string
 *               description: UUID
 *     responses:
 *       201:
 *         description: Successful post
 *       400:
 *         description: Invalid body data
 *       500:
 *         description: Server error
 */

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const validate = validateProfilePost(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    body.userId = await generateUser(body.userId, true);

    const hash = hashEmail(body.email);

    const result = await prisma.profile.create({
      data: { ...body, name: "", phone: "", roleId: 1, hash },
    });

    prisma.$disconnect();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.log(error);
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};
