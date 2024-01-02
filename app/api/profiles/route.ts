import { NextResponse } from "next/server";
import {
  validateProfileGet,
  validateProfilePatch,
  validateProfilePost,
} from "../validation";
import prisma from "../prismaClient";
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

export const GET = async (req: Request) => {
  try {
    const body = await req.json();

    const validate = validateProfileGet(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    const hash = hashEmail(body.email);

    const data = await prisma.profile.findUnique({
      where: { hash },
    });
    prisma.$disconnect();

    return NextResponse.json(data);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();

    const validate = validateProfilePatch(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    const hash = hashEmail(body.email);

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

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();

    const validate = validateProfileGet(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    const hash = hashEmail(body.email);

    const found = await prisma.profile.findFirst({ where: { hash } });

    if (!found) {
      prisma.$disconnect();
      return NextResponse.json(found, { status: 404 });
    }

    const result = await prisma.profile.delete({
      where: { hash },
    });
    prisma.$disconnect();

    return NextResponse.json(result);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};
