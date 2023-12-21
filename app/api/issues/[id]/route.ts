import { NextResponse } from "next/server";
import { validateIssuePatch } from "../../validation";
import prisma from "@/app/api/prismaClient";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    const data = await prisma.issue.findUnique({ where: { id }, include: { category: true, status: true } });
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
  { params }: { params: { id: string } }
) => {
  try {
    const body = await req.json();
    const validate = validateIssuePatch(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    const id = Number(params.id);
    const found = await prisma.issue.findUnique({ where: { id } });
    if (!found) {
      prisma.$disconnect();

      return NextResponse.json(found, { status: 404 });
    }

    const data = await prisma.issue.update({ where: { id }, data: body });

    prisma.$disconnect();

    return NextResponse.json(data);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    const found = await prisma.issue.findFirst({ where: { id } });

    if (!found) {
      prisma.$disconnect();
      return NextResponse.json(found, { status: 404 });
    }

    const result = await prisma.issue.delete({ where: { id } });
    prisma.$disconnect();

    return NextResponse.json(result);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};
