import { NextResponse } from "next/server";
import { validateProfilePost } from "../../utils/validation";
import prisma from "../../utils/prismaClient";
import hashEmail from "@/app/utils/hashEmail";
import generateUser from "@/app/utils/generateUser";

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
