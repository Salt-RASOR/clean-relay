import { NextResponse } from "next/server";
import { validateIssuePatch } from "../../validation";
import prisma from "@/app/api/prismaClient";
import { transformIssueGetData } from "@/app/utils/transformResponses";
import supabaseImages, { supabase } from "@/app/api/supabaseClient";
import checkUserAuth from "@/app/utils/checkUserAuth";

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

    const auth = await checkUserAuth(issue.userId, req, supabase);
    if (auth) {
      return auth;
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
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    const issue = await prisma.issue.findFirst({ where: { id } });

    if (!issue) {
      prisma.$disconnect();
      return NextResponse.json(issue, { status: 404 });
    }

    const auth = await checkUserAuth(issue.userId, req, supabase);
    if (auth) {
      return auth;
    }

    const filePath = issue.filePath;

    await supabaseImages.remove([filePath]);

    const result = await prisma.issue.delete({
      where: { id },
      include: { category: true, status: true },
    });
    prisma.$disconnect();

    const decodedData = transformIssueGetData(result);

    return NextResponse.json(decodedData);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};
