import { NextResponse } from "next/server";
import { validateIssuePatch } from "../../validation";
import prisma from "@/app/api/prismaClient";

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
      return NextResponse.json(found, { status: 404 });
    }

    const data = await prisma.issue.update({ where: { id }, data: body });
    return NextResponse.json(data);
  } catch (error) {
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
      return NextResponse.json(found, { status: 404 });
    }

    const result = await prisma.issue.delete({ where: { id } });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
