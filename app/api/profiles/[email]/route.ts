import hashEmail from "@/app/utils/hashEmail";
import prisma from "../../prismaClient";
import { NextResponse } from "next/server";
import { validateProfilePatch } from "../../validation";

export const GET = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
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
    const hash = hashEmail(params.email);

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
