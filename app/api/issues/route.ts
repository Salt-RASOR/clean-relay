import { NextResponse } from "next/server";
import prisma from "@/app/client";
import { validateIssuePost } from "../validation";

export const GET = async (req: Request) => {
  try {
    const data = await prisma.issue.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const validate = validateIssuePost(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    body.imageUrl = "image url here";

    const data = await prisma.issue.create({ data: body });
    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
